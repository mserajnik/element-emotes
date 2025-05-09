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

import api from '../api'

let isInitialized = false

const state = {
  emotesUrl: null,
  accessKey: null,
  // These defaults must match the defaults in options.js; they are not defined
  // in a separate file and then just imported in options.js and here because
  // that would result in a dynamic import (which we don't want for options.js)
  // and Vite.js/Rollup doesn't allow us to inline dynamic imports when there
  // are multiple inputs.
  defaultEmoteSize: '2em',
  largeEmoteSize: '4em',
  useFrozenEmotes: false,
  emoteSuggestionAmount: 10,
  useEmoteFuzzyMatching: true,
  emoteFuzzyMatchingLocation: 0,
  emoteFuzzyMatchingDistance: 100,
  emoteFuzzyMatchingThreshold: 0.6,
  emoteSuggestionBlacklistedStrings: '',
  usernameColors: ['', '', '', '', '', '', '', ''],
  emotes: [],
}

export default {
  initialize: () => {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      chrome.storage.sync.get(null, async items => {
        // eslint-disable-next-line no-undef
        if (chrome.runtime.lastError) {
          return reject(new Error('Error while intializing the store.'))
        }

        for (const property in items) {
          if (!Object.hasOwn(state, property)) {
            continue
          }

          state[property] = items[property]
        }

        isInitialized = true

        try {
          state.emotes = await api.fetchEmotes()
        } catch {
          return reject(new Error(
            'Error while trying to fetch the emote list; is the emote ' +
            'server URL and/or access key set correctly?'
          ))
        }

        resolve()
      })
    })
  },

  get: item => {
    if (!isInitialized) {
      throw new Error(
        'Store has not been initialized; call `store.initialize()` first.'
      )
    }

    return state[item]
  }
}
