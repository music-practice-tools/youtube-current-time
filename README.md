# youtube-current-time

Provides a large clear current play time display when YouTube videos are playing embedded in a webpage. Ideal for when listening to the audio while viewing the rest of a page. The current play time stays visible at all times in a fixed position and floating above the page contents, even when the player is scrolled off the screen. 

- Cue on a time when listening
- Note when something happens

Project was designed to support interactive music activities in the [Musical U](https://www.musical-u.com/) Musician's Ear course. 

![A large clear timer overlayed on a video](demo.png?raw=true "The timer in action")

## Try and install

The [Test Page](https://raw.githack.com/music-practice-tools/youtube-current-time/master/test.html) contains 2 embedded YouTube video and instructions for installing a bookmark that makes it easy to show the time on a webpage.

If you need to manually create a favourite then use this code as the Location or URL field:

```javascript
javascript:(function(){d=document;s=d.createElement('script');s.type='text/javascript';s.src='https://raw.githack.com/music-practice-tools/youtube-current-time/master/ytct.js';d.getElementsByTagName('head')[0].appendChild(s);})();
```

Some browsers require that you first bookmark any site and then edit the bookmark.

In general, to use YouTube Time:

- open a web page with a YouTube video player on it;
- click the bookmark / favourite 'YouTube Time';
- play and pause the video(s)

Note the bookmark will reload the videos on a page so the players reset to the start

The timer needs reloading every time the page is refreshed or a new page is opened, Simply click the bookmark again.

<!-- Alternatively, simply drag this link into your web browser's bookmarks toolbar
<div>
  <a href="javascript:(function(){d=document;s=d.createElement('script');s.type='text/javascript';s.src='https://raw.githack.com/music-practice-tools/youtube-current-time/master/ytct.js';d.getElementsByTagName('head')[0].appendChild(s);})();">Current Time</a>.
 </div>
Then select the YouTube Current Time bookmark and play an embedded video.</p>
-->

## Notes

You'll need a modern browser. The latest Firefox, Chrome, Edge, Edge Chromium and Safari (MacOS and iPad) are all OK.

You also need a browser that supports bookmarks so that would appear to limit it's use to desktop browsers and not mobile browsers.

## Code Notes

The bookmark is a standard Javascript Bookmarklet that injects the `ytct.js` script into the current page.

The `ytct.js` code does a crude check for ES6 support and alerts the user if not availale. Otherwise, the code loads `ytct-es6.js` which injects the [YouTube iFrame API](https://developers.google.com/youtube/iframe_api_reference) so it can access the current time. It also injects styles for the CSS time popup. The video is reloaded with an option to enable the API. APi start and stop events control an Interval which triggers polling the player current time and the display through setting a data-attribute to the time. When there are multiple players the time display tracks the one last started.

The code has to keep polling the YouTube player for the time so it will use a little more power than when it is not running. That's a consideration when setting the poll rate and it can't be too long or there are obvious glitchs with the 1 second updates. When the current video is paused the polling stop.

You can always include the code directly in your own webpages, avoiding the need for a bookmark.
