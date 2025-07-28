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

import store from '../../store'

const anchorNodeClass = 'mx_QuickSettingsButton'

const insertStatusIndicator = (node, emote) => {
  const style = `
    background-image: url('${emote.url}?accessKey=${store.get('accessKey')}');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    flex: 0 0 auto;
    margin: 12px auto;
    min-height: 32px;
    min-width: 32px;
  `

  node.insertAdjacentHTML(
    'afterend',
    `<div
      style="${style}"
      tabindex="0"
      title="${emote.name}"
    </div>`
  )
}

const handlePotentialAnchorNode = (node, emote, observer) => {
  if (node.classList && node.classList.contains(anchorNodeClass)) {
    observer.disconnect()
    insertStatusIndicator(node, emote)
    return
  }

  if (node.childNodes) {
    [...node.childNodes].forEach(childNode => {
      handlePotentialAnchorNode(childNode, emote, observer)
    })
  }
}

export default {
  initialize: () => {
    if (!store.get('displayStatusIndicator')) {
      return
    }

    const blacklistedStrings = store.get('emoteSuggestionBlacklistedStrings')
      .split('|')
      .map(blacklistedString => blacklistedString.trim().toLowerCase())
      .filter(blacklistedString => blacklistedString !== '')

    const emotes = store.get('emotes')
      .filter(emote => {
        const lowerCaseEmoteName = emote.name.toLowerCase()

        for (const blacklistedString of blacklistedStrings) {
          if (lowerCaseEmoteName.includes(blacklistedString)) {
            return false
          }
        }

        return true
      })

    const randomEmote = emotes[Math.floor(Math.random() * emotes.length)]

    if (!randomEmote) {
      return
    }

    const existingAnchorNode = document.querySelector(
      `.${anchorNodeClass}`
    )

    if (existingAnchorNode) {
      insertStatusIndicator(existingAnchorNode, randomEmote)
      return
    }

    new window.MutationObserver((mutations, observer) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          handlePotentialAnchorNode(node, randomEmote, observer)
        }
      }
    }).observe(document.body, {
      childList: true,
      subtree: true
    })
  }
}
