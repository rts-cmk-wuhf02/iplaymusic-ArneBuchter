"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var audioArray = document.getElementsByClassName('aplayer');
  var nowPlaying = audioArray[0];
  var playbutton = document.querySelector('.playbutton');
  console.log(nowPlaying);
  playbutton.addEventListener('click', function () {
    if (!playbutton.classList.contains('fa-pause')) {
      nowPlaying.play();
      playbutton.classList.add('fa-pause');
      playbutton.classList.remove('fa-caret-right');
    } else {
      nowPlaying.pause();
      playbutton.classList.remove('fa-pause');
      playbutton.classList.add('fa-caret-right');
    }
  });
});