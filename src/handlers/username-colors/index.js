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

const elementDefaultUsernameColors = [
  'var(--cpd-color-blue-1200)',
  'var(--cpd-color-fuchsia-1200)',
  'var(--cpd-color-green-1200)',
  'var(--cpd-color-pink-1200)',
  'var(--cpd-color-orange-1200)',
  'var(--cpd-color-cyan-1200)',
  'var(--cpd-color-purple-1200)',
  'var(--cpd-color-lime-1200)',
]

const adjustedUsernameColors = []

export default {
  initialize: () => {
    const usernameColors = store.get('usernameColors')

    for (let i = 0; i < 8; i++) {
      if (
        usernameColors[i] !== '' &&
        usernameColors[i] !== elementDefaultUsernameColors[i]
      ) {
        adjustedUsernameColors.push(usernameColors[i])
        continue
      }

      adjustedUsernameColors.push(null)
    }

    const hasCustomUsernameColors = adjustedUsernameColors.some(
      color => color !== null
    )

    if (!hasCustomUsernameColors) {
      return
    }

    const style = document.createElement('style')

    for (const [index, color] of adjustedUsernameColors.entries()) {
      if (!color) {
        continue
      }

      style.innerHTML += `
        .mx_Username_color${index + 1} {
          color: ${color} !important;
        }
      `
    }

    document.head.appendChild(style)
  }
}
