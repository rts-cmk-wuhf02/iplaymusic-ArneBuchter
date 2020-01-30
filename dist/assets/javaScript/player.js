"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var audioArray = document.getElementsByClassName('aplayer');
  var nowPlaying = audioArray[0];
  var playbutton = document.querySelector('.playbutton');
  console.log(nowPlaying);
  playbutton.addEventListener('click', function () {
    nowPlaying.play();
  });
});