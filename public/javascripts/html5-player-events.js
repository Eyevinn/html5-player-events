var mediaevents = [];
const EVENTS = [
  'abort',
  'autocompelte',
  'autocompleteerror',
  'DOMContentLoaded',
  'afterprint',
  'afterscriptexecute',
  'beforeprint',
  'beforeprintexecute',
  'beforeunload',
  'blur',
  'cancel',
  'change',
  'click',
  'close',
  'connect',
  'contextmenu',
  'error',
  'focus',
  'hashchange',
  'input',
  'invalid',
  'languagechange',
  'load',
  'loadend',
  'loadstart',
  'message',
  'offline',
  'online',
  'open',
  'pagehide',
  'pageshow',
  'popstate',
  'progress',
  'readystatechange',
  'reset',
  'select',
  'show',
  'sort',
  'storage',
  'submit',
  'toggle',
  'unload',
  'loadeddata',
  'loadedmetadata',
  'canplay',
  'playing',
  'play',
  'canplaythrough',
  'seeked',
  'seeking',
  'stalled',
  'suspend',
  //'timeupdate',
  'volumechange',
  'waiting',
  'durationchange',
  'emptied',
  'unhandledrejection',
  'rejectionhandled'
];

document.addEventListener('DOMContentLoaded', function(ev, data) {
  $('#browser').html(navigator.userAgent.toLowerCase());

  var timer = setInterval(function() {
    var evel = $('#events');

    var html = '';
    mediaevents.sort(function(a,b) {return a.t - b.t;} ).forEach(function(ev) {
      html = html + parseFloat(ev.t).toFixed(3) + "ms: " + ev.type + "<br>";
    });
    evel.html(html);
  }, 1000);

  playVideo();
});

function isSafari() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') != -1) {
        if (ua.indexOf('chrome') > -1) {
            console.log("not safari");
            return false;
        } else {
            console.log("is safari");
            return true;
        }
    } else {
        console.log("not safari");
        return false;
    }
}

function addEvent(type) {
  var ev = {
    type: type,
    t: performance.now()
  };
  mediaevents.push(ev);
}

function playVideo() {
  player = document.getElementById('videocontainer');
  var src = "http://csm-e.cds1.yospace.com/csm/live/119101367.m3u8";

  EVENTS.forEach(function(ev) {
    player.addEventListener(ev.toLowerCase(), function() {
      addEvent(ev);
    });
  });

  if(isSafari()) {
    $('#playertype').html("Native player");
    player.src = src;
    player.play();
  } else {
    $('#playertype').html("HLS.js player");
    var hls = new Hls({ enableWorker: false });
    hls.loadSource(src);
    hls.attachMedia(player);
    hls.on(Hls.Events.MANIFEST_PARSED, function(ev, data) {
      player.play();
    });
  }


}
