"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(document.location.search);
  var albumId = params.get('id');
  var header = document.querySelector('.header__text');
  header.innerHTML = "Albumdetails";

  if (sessionStorage.getItem("access_token") != undefined) {
    getAlbumFetch();
  } else {
    postfetch();
  }

  function postfetch() {
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic ZDNhNDc2MzMzNTYxNDFkZWI1MTYwZDk4ZWFkZWJiMTg6MjU5OGM2YmNjYWY1NDQ3MGFkZDczMTVmZmY5OGU5Y2E"
      },
      body: "grant_type=client_credentials"
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      var token = data.access_token;
      console.log('POST', data);
      sessionStorage.setItem("access_token", token);
      getAlbumFetch();
    })["catch"](function (error) {
      console.error('Error:', error);
    });
  }

  function getAlbumFetch() {
    fetch("https://api.spotify.com/v1/albums/".concat(albumId), {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + sessionStorage.access_token
      }
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      var albumImage = document.querySelector('.albumdetails__img');
      var albumTitle = document.querySelector('.albumdetails__songtitle');
      var songCount = document.querySelector('.albumdetails__count');
      var listObjectTemplate = document.querySelector('.listobject__template');
      var list = document.getElementsByClassName('listobject')[0];
      albumImage.src = data.images[0].url;
      albumTitle.innerText = data.name;
      songCount.innerHTML = data.total_tracks + " track from " + data.artists[0].name;
      data.tracks.items.forEach(function (album) {
        function millisToMinutesAndSeconds(millis) {
          var minutes = Math.floor(millis / 60000);
          var seconds = (millis % 60000 / 1000).toFixed(0);
          return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }

        var songduration = millisToMinutesAndSeconds(album.duration_ms);
        var clone = listObjectTemplate.content.cloneNode(true);
        clone.querySelector('.listobject__info').href = "/player/index.html?id=".concat(album.id);
        clone.querySelector('.listobject__heading').innerHTML = "".concat(album.name);
        clone.querySelector('#artist').innerHTML = "".concat(album.artists[0].name);
        clone.querySelector('.listobject__count').innerHTML = "".concat(songduration);
        list.appendChild(clone);
      });
    })["catch"](function (error) {
      console.error('error', error);

      if (error) {
        postfetch();
      }
    });
  }
});