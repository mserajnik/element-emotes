document.addEventListener("DOMContentLoaded",(function(){chrome.storage.sync.get({emotesUrl:"",accessKey:"",defaultEmoteSize:"2em",largeEmoteSize:"4em",useFrozenEmotes:!1},(function(e){document.getElementById("emotes-url").value=e.emotesUrl,document.getElementById("access-key").value=e.accessKey,document.getElementById("default-emote-size").value=e.defaultEmoteSize,document.getElementById("large-emote-size").value=e.largeEmoteSize,document.getElementById("use-frozen-emotes").checked=e.useFrozenEmotes}))})),document.getElementById("save").addEventListener("click",(function(){var e=document.getElementById("emotes-url").value,t=document.getElementById("access-key").value,n=document.getElementById("default-emote-size").value,o=document.getElementById("large-emote-size").value,m=document.getElementById("use-frozen-emotes").checked;chrome.storage.sync.set({emotesUrl:e,accessKey:t,defaultEmoteSize:n,largeEmoteSize:o,useFrozenEmotes:m},(function(){var e=document.getElementById("status");e.textContent="Options saved.",setTimeout((function(){e.textContent=""}),750)}))}));