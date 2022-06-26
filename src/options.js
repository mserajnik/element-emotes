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

const saveOptions = () => {
  const emotesUrl = document.getElementById('emotes-url').value
  const accessKey = document.getElementById('access-key').value
  const defaultEmoteSize = document.getElementById('default-emote-size').value
  const largeEmoteSize = document.getElementById('large-emote-size').value

  // eslint-disable-next-line no-undef
  chrome.storage.sync.set({
    emotesUrl,
    accessKey,
    defaultEmoteSize,
    largeEmoteSize
  }, () => {
    const status = document.getElementById('status')
    status.textContent = 'Options saved.'

    setTimeout(() => {
      status.textContent = ''
    }, 750)
  })
}

const restoreOptions = () => {
  // eslint-disable-next-line no-undef
  chrome.storage.sync.get({
    emotesUrl: '',
    accessKey: '',
    defaultEmoteSize: '2em',
    largeEmoteSize: '4em'
  }, items => {
    document.getElementById('emotes-url').value = items.emotesUrl
    document.getElementById('access-key').value = items.accessKey
    document.getElementById('default-emote-size').value = items.defaultEmoteSize
    document.getElementById('large-emote-size').value = items.largeEmoteSize
  })
}

document.addEventListener('DOMContentLoaded', restoreOptions)
document.getElementById('save').addEventListener('click', saveOptions)