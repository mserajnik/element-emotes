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
 */const c=()=>{const e=document.getElementById("emotes-url").value,o=document.getElementById("access-key").value,n=document.getElementById("default-emote-size").value,s=document.getElementById("large-emote-size").value,m=document.getElementById("use-frozen-emotes").checked,u=document.getElementById("emote-suggestion-amount").value;chrome.storage.sync.set({emotesUrl:e,accessKey:o,defaultEmoteSize:n,largeEmoteSize:s,useFrozenEmotes:m,emoteSuggestionAmount:u},()=>{const t=document.getElementById("status");t.textContent="Options saved.",setTimeout(()=>{t.textContent=""},750)})},d=()=>{chrome.storage.sync.get({emotesUrl:"",accessKey:"",defaultEmoteSize:"2em",largeEmoteSize:"4em",useFrozenEmotes:!1,emoteSuggestionAmount:10},e=>{document.getElementById("emotes-url").value=e.emotesUrl,document.getElementById("access-key").value=e.accessKey,document.getElementById("default-emote-size").value=e.defaultEmoteSize,document.getElementById("large-emote-size").value=e.largeEmoteSize,document.getElementById("use-frozen-emotes").checked=e.useFrozenEmotes,document.getElementById("emote-suggestion-amount").value=e.emoteSuggestionAmount})};document.addEventListener("DOMContentLoaded",d);document.getElementById("save").addEventListener("click",c);
