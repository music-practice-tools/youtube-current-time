            document.body.onload=insertYTScript
            document.body.unload=cleanup

            function insertYTScript(){
                var tag = document.createElement('script');
                tag.id = 'iframe-demo';
                tag.src = 'https://www.youtube.com/iframe_api';
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }

            function onYouTubeIframeAPIReady() {
                    const frames = [...document.getElementsByTagName('iframe')]
                    const ytFrames = frames.filter((p)=>p.src.startsWith('https://www.youtube.com'))
                    ytFrames.forEach((frame, i, ar) => {
                        frame.src += `&enablejsapi=1`
                        const player = new YT.Player(frame, {
                            events: {
                            'onStateChange': onPlayerStateChange
                            }   
                        })
                    })
            }

            let interval;
            const playerByRef = []
            const body = document.getElementsByTagName("body")[0]
            function showVideoTime(player) {
                function setTime(playerByRef2) {
                    const player=playerByRef2[0]
                    const time = player.getCurrentTime()
                    body.setAttribute('data-videotime', Math.floor(time))
                }
                playerByRef[0] = player
                if (!interval) {
                    interval = setInterval(()=>setTime(playerByRef), 500)
                }
            }

            function cleanup() {
                if (interval) {
                    clearInterval(interval)
                    interval = undefined
                }

            }

            function stopVideoTime() {
                cleanup()
//                body.removeAttribute('data-videotime')
            }

            function onPlayerStateChange(event) {
              const {data: playerStatus, target: player} = event

              if (playerStatus == YT.PlayerState.PLAYING) {
                showVideoTime(player)
              } else if ([YT.PlayerState.ENDED,YT.PlayerState.PAUSED].includes(playerStatus)) {
                stopVideoTime()
              }
            }
