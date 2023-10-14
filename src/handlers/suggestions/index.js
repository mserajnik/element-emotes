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

import Fuse from 'fuse.js'

import store from '../../store'

const { Textcomplete } = require('@textcomplete/core')
const { ContenteditableEditor } = require('@textcomplete/contenteditable')

let fuse, textcompleteOptions

const gatherCandidates = term => fuse.search(
  term.split(':').join('')
)

const textcompleteStrategy = {
  id: 'emote',
  match: /\B:([-+\w]*)$/,
  index: 1,
  search: async (
    term,
    callback,
    match
  ) => {
    callback(gatherCandidates(term))
  },
  cache: false,
  template: emote =>
    `<img src="${emote.item.url}?accessKey=${store.get('accessKey')}">&nbsp;<small>${emote.item.name}</small>`,
  replace: emote => `:${emote.item.name}: `
}

const handleEmoteSuggestions = async (messageInputNode, requiresManualDeletions = false) => {
  if (messageInputNode.dataset.handlingEmoteSuggestions) {
    return
  }

  messageInputNode.dataset.handlingEmoteSuggestions = true

  if (requiresManualDeletions) {
    messageInputNode.dataset.requiresManualDeletions = true
  }

  const textcomplete = new Textcomplete(
    new ContenteditableEditor(messageInputNode),
    [textcompleteStrategy],
    textcompleteOptions
  )

  new MutationObserver((mutations, observer) => {
    // Destroy the textcomplete if the message input is removed/disappears so
    // we don't end up with orphaned completion suggestions
    if (!document.body.contains(messageInputNode)) {
      textcomplete.destroy()
      observer.disconnect()
    }
  }).observe(document.body, {
    childList: true,
    subtree: true
  })
}

const handlePotentialMessageInputNode = node => {
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return
  }

  const messageInputNodes = [
    {
      class: 'mx_BasicMessageComposer_input',
      requiresManualDeletions: false
    },
    {
      class: 'mx_WysiwygComposer_Editor_content',
      requiresManualDeletions: true
    }
  ]

  if (node.classList) {
    for (const messageInputNode of messageInputNodes) {
      if (node.classList.contains(messageInputNode.class)) {
        handleEmoteSuggestions(node, messageInputNode.requiresManualDeletions)
        return
      }
    }
  }

  if (node.childNodes) {
    [...node.childNodes].forEach(handlePotentialMessageInputNode)
  }
}

export default {
  initialize: () => {
    fuse = new Fuse(
      store.get('emotes'),
      {
        // TODO: We can use this to highlight the matched characters
        // includeMatches: true,
        keys: ['name']
      }
    )

    textcompleteOptions = {
      dropdown: {
        className: 'dropdown-menu textcomplete-dropdown mx_Autocomplete',
        maxCount: store.get('emoteSuggestionAmount'),
        placement: 'top',
        header: () => '',
        footer: () => '',
        rotate: true,
        style: { display: 'none', position: 'absolute', zIndex: '1000' },
        parent: document.body,
        item: {
          className: 'textcomplete-item mx_Autocomplete_Completion_pill',
          activeClassName: 'textcomplete-item active mx_Autocomplete_Completion_pill mx_Autocomplete_Completion selected'
        }
      }
    }

    new MutationObserver(mutations => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          handlePotentialMessageInputNode(node)
        }
      }
    }).observe(document.body, {
      childList: true,
      subtree: true
    })
  }
}
