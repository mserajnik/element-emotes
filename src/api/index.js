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

import store from '../store'

const urlWithAccessKey = (url, accessKey) => `${url}?accessKey=${accessKey}`

export default {
  fetchEmotes: async () => {
    let response = await fetch(
      urlWithAccessKey(store.get('emotesUrl'), store.get('accessKey'))
    )

    if (!response.ok) {
      // Handle non-5xx errors
      // https://stackoverflow.com/a/40251448
      const err = new Error(`HTTP status code: ${response.status}`)
      err.response = response
      err.status = response.status

      throw err
    }

    response = await response.json()

    return response.emotes
  }
}
