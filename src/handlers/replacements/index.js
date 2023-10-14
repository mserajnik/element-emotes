/*!
 * element-emotes
 * Copyright (C) 2022-present  Michael Serajnik  https://github.com/mserajnik
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import EMOJI_REGEX from 'emojibase-regex'

import store from '../../store'

let accessKey, useFrozenEmotes

const getContentWithoutEmotes = content => {
  for (const emote of store.get('emotes')) {
    content = content.split(`:${emote.name}:`).join('')
  }

  return content
}

const hasEmotesOnly = content => {
  content = getContentWithoutEmotes(
    content
      .replace(/\s/g, '') // Whitespace
      .replace(/[\u200D\u2003]/g, '') // Zero-width joiner Unicode characters
      .replace(new RegExp(EMOJI_REGEX.source, 'gi'), '') // Emoji
  )

  return content.trim() === ''
}

const getFrozenEmoteUrl = emoteUrl => {
  return emoteUrl.match(/^.+\/emotes\/.+\.(gif|apng)(\?.+)?$/)
    ? emoteUrl.split('/emotes/').join('/frozen-emotes/')
    : null
}

const toggleFrozenEmotes = (freeze = false) => {
  const emotes = document.querySelectorAll('[data-frozen-emote-url]')

  if (!emotes.length) {
    return
  }

  for (const emote of emotes) {
    if (freeze) {
      emote.src = emote.dataset.frozenEmoteUrl
      continue
    }

    emote.src = emote.dataset.emoteUrl
  }
}

const replaceEmotes = (messageNode, force = false) => {
  if (messageNode.dataset.emotesReplaced && !force) {
    return
  }

  const messageBodyNode = messageNode.querySelector('.mx_EventTile_body')

  if (!messageBodyNode) {
    return
  }

  let content = messageBodyNode.innerHTML

  const style = hasEmotesOnly(messageBodyNode.textContent)
    ? `max-height:${store.get('largeEmoteSize')};vertical-align:bottom`
    : `max-height:${store.get('defaultEmoteSize')}`

  for (const emote of store.get('emotes')) {
    const frozenEmoteUrl = getFrozenEmoteUrl(emote.url)

    content = content
      .split(`:${emote.name}:`)
      .join(
        `<img
          style="${style}"` +
          (
            useFrozenEmotes && frozenEmoteUrl
              ? (
                  document.hasFocus()
                    ? `src="${emote.url}?accessKey=${accessKey}"`
                    : `src="${frozenEmoteUrl}?accessKey=${accessKey}"`
                )
              : `src="${emote.url}?accessKey=${accessKey}"`
          ) +
          `data-emote-url="${emote.url}?accessKey=${accessKey}"` +
          (
            useFrozenEmotes && frozenEmoteUrl
              ? `data-frozen-emote-url="${frozenEmoteUrl}?accessKey=${accessKey}"`
              : ''
          ) +
          `alt="${emote.name}"
          title="${emote.name}">`
      )
  }

  messageBodyNode.innerHTML = content

  messageNode.dataset.emotesReplaced = true
}

const handlePotentialMessageNode = node => {
  if (node.classList && node.classList.contains('mx_EventTile_content')) {
    replaceEmotes(node)
    return
  }

  if (node.classList && node.classList.contains('mx_EventTile_edited')) {
    replaceEmotes(node.parentNode, true)
    return
  }

  if (node.childNodes) {
    [...node.childNodes].forEach(handlePotentialMessageNode)
  }
}

export default {
  initialize: () => {
    accessKey = store.get('accessKey')
    useFrozenEmotes = store.get('useFrozenEmotes')

    new MutationObserver(mutations => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          handlePotentialMessageNode(node)
        }
      }
    }).observe(document.body, {
      childList: true,
      subtree: true
    })

    if (useFrozenEmotes) {
      // The windows needs to be focused at least once for the `focus` and
      // `blur` events to work
      window.focus()

      window.addEventListener('focus', () => {
        toggleFrozenEmotes(false)
      })

      window.addEventListener('blur', () => {
        toggleFrozenEmotes(true)
      })
    }
  }
}
