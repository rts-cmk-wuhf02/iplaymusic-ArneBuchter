"use strict";

jQuery(document).ready(function () {
  var audioArray = document.getElementsByClassName('aplayer');
  var nowPlaying = audioArray[0];
  console.log(nowPlaying);
  nowPlaying.load();
  $('.player__playicon').on('click', function () {
    nowPlaying.play();
  });
  /*   
  
      $('.stop').on('click', function(){
          nowPlaying.pause();
      })
  
      $('.step').on('click', function() {
          $each($('aplayer'), function(){
              this.pause();
          });
          ++i;
          nowPlaying.load();
          nowPlaying.play();
      }) */
});