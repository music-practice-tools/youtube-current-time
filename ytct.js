// Needs to be a function in order for YT iFrame API to call it
function onYouTubeIframeAPIReady() {
  enhanceFn();
}

const enhanceFn = (function ytct() {
  window.onload = () => {
    injectYTAPI();
    injectStyles();
  };
  window.onunload = cleanup;

  function injectStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
    body[data-videotime]::before {
        position:fixed;
        left:20px;
        top:20px;
        font-size:3.5em;
        color:black;
        background-color:yellow;
        padding: 7px;
        border:solid thick Black;
        border-radius: 5px;
        content: attr(data-videotime);
    }`;
    const head = document.querySelector("head");
    head.insertBefore(style, head.firstChild);
  }

  function injectYTAPI() {
    var script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    const head = document.querySelector("head");
    head.insertBefore(script, head.firstChild);
    // when ready this calls onYouTubeIframeAPIReady
  }

  let interval;

  function cleanup() {
    if (interval) {
      clearInterval(interval);
      interval = undefined;
    }
  }

  function enhanceYTFrames() {
    const frames = [...document.getElementsByTagName("iframe")];
    const ytFrames = frames.filter(p =>
      p.src.startsWith("https://www.youtube.com")
    );
    ytFrames.forEach((frame, i, ar) => {
      // Reload with API enabled
      frame.src += `&enablejsapi=1&domain=${window.location.host}`;
      const player = new YT.Player(frame, {
        events: {
          onStateChange: onPlayerStateChange
        }
      });
    });

    const body = document.getElementsByTagName("body")[0];

    const playerByRef = [];
    function showVideoTime(player) {
      function setTime(playerByRef2) {
        const player = playerByRef2[0];
        const time = player.getCurrentTime();
        body.setAttribute("data-videotime", Math.floor(time));
      }
      playerByRef[0] = player;
      if (!interval) {
        interval = setInterval(() => setTime(playerByRef), 400);
      }
    }

    function stopVideoTime() {
      cleanup();
      //     body.removeAttribute('data-videotime')
    }

    function onPlayerStateChange(event) {
      const { data: playerStatus, target: player } = event;

      if (playerStatus == YT.PlayerState.PLAYING) {
        showVideoTime(player);
      } else if (
        [YT.PlayerState.ENDED, YT.PlayerState.PAUSED].includes(playerStatus)
      ) {
        stopVideoTime();
      }
    }
  }

  return enhanceYTFrames;
})();
