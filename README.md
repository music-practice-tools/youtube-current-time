# youtube-current-time

Makes it easier to see the time when playing videos by showing the current time in a large clear format. Displays the video current time while an embedded YouTube video is playing.

- Open a page with 1 or more YouTube Players on it
- click the bookmark 'Current Time' mark - see below for how to create the bookmark.
- play and pause the video(s)

## Creating the Bookmark

Create a web browser bookmark using the code below as the location.

```javascript
javascript:(function(){d=document;s=d.createElement('script');s.type='text/javascript';s.src='https://raw.githack.com/music-practice-tools/youtube-current-time/master/ytct.js';d.getElementsByTagName('head')[0].appendChild(s);})();
```

Alternatively, simply drag this link into your web browser's bookmarks toolbar 
<div>
  <a href="javascript:(function(){d=document;s=d.createElement('script');s.type='text/javascript';s.src='https://raw.githack.com/music-practice-tools/youtube-current-time/master/ytct.js';d.getElementsByTagName('head')[0].appendChild(s);})();">Current Time</a>. 
 </div> 
Then select the YouTube Current Time bookmark and play an embedded video.</p>

## Notes

You'll need a modern browser. The latest FireFox, Chrome and Edge are OK. I've not tried Safari.

You also need a browser that supports bookmarks so that limits it to use in desktop and not mobile browsers.

The code has to keep asking the YouTube player for the time so it can use a little more power than when it is not running. It requests the time every 0.5 seconds. When the current video is paused the requests stop.

