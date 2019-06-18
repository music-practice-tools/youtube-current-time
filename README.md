# youtube-current-time

Provides a large clear time counter when YouTube videos are playing. Stays visible (unlike the player controls) and stay fixed while you scroll and interact with the webpage. It works with YouTube players that are embedded into a web page (with some restrictions including the YouTube website).

* Keep track of and share interesting moments in a video (especially useful if sound only)
* Provide time cues for when playing along

![A large clear timer overlayed on a video](demo.png?raw=true "The timer in action")

- open a web page with a YouTube video player on it
- click the bookmark / favourite 'Current Time' - see below for how to create this.
- play and pause the video(s)
 
Note the bookmark will reload the videos on a page so the players reset to the start

You'll need to reclick the bookmark every time the page is refresehed or a new page is opened. 

## Creating the Bookmark / Favourite

Create a web browser bookmark / favourite and copy the code below into the Location or URL field in the bookmark form.

```javascript
javascript:(function(){d=document;s=d.createElement('script');s.type='text/javascript';s.src='https://raw.githack.com/music-practice-tools/youtube-current-time/master/ytct.js';d.getElementsByTagName('head')[0].appendChild(s);})();
```

Note that on Chrome and Edge you will have to create a Favourite 1st (any page) and then edit it.

That's it. Test it on [this page](https://raw.githack.com/music-practice-tools/youtube-current-time/master/test.html).


<!-- Alternatively, simply drag this link into your web browser's bookmarks toolbar 
<div>
  <a href="javascript:(function(){d=document;s=d.createElement('script');s.type='text/javascript';s.src='https://raw.githack.com/music-practice-tools/youtube-current-time/master/ytct.js';d.getElementsByTagName('head')[0].appendChild(s);})();">Current Time</a>. 
 </div> 
Then select the YouTube Current Time bookmark and play an embedded video.</p>
-->

## Notes

You'll need a modern browser. The latest Firefox, Chrome and Edge (and Edge Cromium) are all OK. I've not tried Safari yet.

You also need a browser that supports bookmarks so that would appear to limit it's use to desktop browsers and not mobile browsers.

# Code Notes

The bookmark is a standard Javascript Bookmarklet that injects the `ytct.js` script into the current page. 

The `ytct.js` code injects the [YouTube iFrame API](https://developers.google.com/youtube/iframe_api_reference) so it can access the current time. It also injects styles for the CSS time popup. The video is reloaded with an option to enable the API. APi start and stop events control an Interval which triggers polling the player current time and the display through setting a data-attribute to the time. When there are multiple players the time display tracks the one last started. 

The code has to keep polling the YouTube player for the time so it will use a little more power than when it is not running. That's a consideration when setting the poll rate and it can't be too long or there are obvious glitchs with the 1 second updates. When the current video is paused the polling stop.

You can always include the code in your own webpages, avoiding the need for a bookmark.
