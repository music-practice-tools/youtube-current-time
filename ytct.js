function mpt_inject() {
  // YouTube iFrame API
  var script = document.createElement("script");
  script.src = "https://www.youtube.com/iframe_api";
  const head = document.querySelector("head");
  head.insertBefore(script, head.firstChild);
  // when ready this calls onYouTubeIframeAPIReady

  const style = document.createElement("style");
  style.innerHTML = `
    body[data-videotime]::before {
        position: fixed;
        left: 0.5em;
        top: 0.5em;
        font-size: 3.5em;
        color: black;
        width:3.2em;
        text-align:center;
        background-color: yellow;
        padding: 0.2em;
        padding-bottom: 0.1em;
        border: solid thick black;
        border-radius: 0.25em;
        content: attr(data-videotime);
        font-family: Arial,helvetica,sans-serif;
        z-index: 1;
    }`;
  head.insertBefore(style, head.firstChild);
}

// Needs to be a function in order for YT iFrame API to call it
function onYouTubeIframeAPIReady() {
  window.onunload = cleanup;

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

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60).toString()
        const secs = Math.floor(seconds % 60).toString()
        return `${mins.padStart(2, '0')}:${secs.padStart(2, '0')}`
    }

    const playerByRef = [];
    function showVideoTime(player) {
      function setTime(playerByRef2) {
        const player = playerByRef2[0];
        const time = player.getCurrentTime();
        body.setAttribute("data-videotime", formatTime(time));
      }
      playerByRef[0] = player;
      if (!interval) {
        interval = setInterval(() => setTime(playerByRef), 500);
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

  enhanceYTFrames();
}

mpt_inject();
