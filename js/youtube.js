//IgKuhwDYxx8
//dkktG7e1zsk



var myYTPlayers = new Array();
var myOrigin;

jQuery(document).ready(function() {
  loadYouTube();
}); // end READY

function onPlayerReady (event) {
  //console.log('onPlayerReady', event);
}

function onPlayerStateChange () {
  //console.log("onPlayerStateChange");
}

function loadYouTube () {
  //console.log('videosPageLodaded');
  var youtubeScriptId = 'youtube-api';
  var youtubeScript = document.getElementById(youtubeScriptId);
  if (youtubeScript === null) {
    var tag = document.createElement('script');
    var firstScript = document.getElementsByTagName('script')[0];
    tag.src = 'https://www.youtube.com/iframe_api';
    //tag.src = 'https://www.youtube-nocookie.com/iframe_api';
    
    tag.id = youtubeScriptId;
    firstScript.parentNode.insertBefore(tag, firstScript);
  }

  window.onYouTubeIframeAPIReady = function() {

    myOrigin = document.URL
    myYT_boxes = jQuery('.yt-player');

    jQuery.each(myYT_boxes, function(i, e) {
      tPlayerID = jQuery(e).attr('id');
      tVideoID = jQuery(e).attr('data-yt-id');

      window.tPlayer = new window.YT.Player(tPlayerID, {
        videoId: tVideoID,
        host: 'https://www.youtube-nocookie.com',
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        },
        playerVars: {
            origin: window.location.host,
            //'origin': myOrigin,
            'controls': '1',
            'showinfo': '0'
          }
      });
      myYTPlayers.push(tPlayer);
    }); // end each
  }



}
