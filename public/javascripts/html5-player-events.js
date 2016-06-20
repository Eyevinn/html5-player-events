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
  'ended',
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
  'pause',
  'ratechange',
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

const livemanifest = "http://csm-e.cds1.yospace.com/csm/live/119101367.m3u8";
const vodmanifest = "http://tv4play-i.akamaihd.net/i/mp4root/2016-05-26/pid200012449(3383572_,T3MP445,T3MP435,T3MP425,T3MP415,T3MP48,T3MP43,T3MP4130,).mp4.csmil/master.m3u8";

function playLive() {
  playVideo(livemanifest);
}

function playVOD() {
  playVideo(vodmanifest);
}

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
  
  player = document.getElementById('videocontainer');
  EVENTS.forEach(function(ev) {
    player.addEventListener(ev.toLowerCase(), function() {
      addEvent(ev);
    });
  });

  playVideo(livemanifest);
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
  console.log(ev.t + ": " + ev.type);
}

function playVideo(manifesturi) {
  var src = manifesturi;
 
  mediaevents = [];


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
