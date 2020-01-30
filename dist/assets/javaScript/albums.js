"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.header__text');
  header.innerHTML = "Albums";

  if (sessionStorage.getItem("access_token") != undefined) {
    getfetch();
    getAlbumFetch();
  } else {
    postfetch();
  } //console.log(sessionStorage)


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
      getfetch();
      getAlbumFetch();
    })["catch"](function (error) {
      console.error('Error:', error);
    });
  }

  function getfetch() {
    fetch("https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + sessionStorage.access_token
      }
    }).then(function (response) {
      return response.json();
    }).then(function (data) {//   console.log(data)
      //   console.log(sessionStorage.access_token)
    })["catch"](function (error) {
      console.error('error', error);
    });
  }

  function getAlbumFetch() {
    fetch("https://api.spotify.com/v1/browse/new-releases", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + sessionStorage.access_token
      }
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      var swiperTemplate = document.querySelector('.carusel__template');
      var listOne = document.getElementsByClassName('main-carousel')[0];
      /*          let listObjectTemplate = document.querySelector('.listobject__template');
                  let listTwo = document.getElementsByClassName('listobject__imgwrapper')[0]; */

      var listObjectTemplate = document.querySelector('.listobject__template');
      var listTwo = document.getElementsByClassName('listobject')[0];
      /*             console.log(sessionStorage.access_token) */

      data.albums.items.forEach(function (album) {
        //console.log(album)
        var cloneOne = swiperTemplate.content.cloneNode(true);
        cloneOne.querySelector('.swiper__img').src = "".concat(album.images[0].url);
        listOne.appendChild(cloneOne);
        var cloneTwo = listObjectTemplate.content.cloneNode(true);
        cloneTwo.querySelector('.listobject__img').src = "".concat(album.images[0].url);
        cloneTwo.querySelector('.listobject__heading').innerHTML = "".concat(album.name);
        cloneTwo.querySelector('#artist').innerHTML = "".concat(album.artists[0].name);
        cloneTwo.querySelector('.listobject__count').innerHTML = "".concat(album.total_tracks, " track");
        cloneTwo.querySelector('.listobject__info').href = "/albumdetails/index.html?id=".concat(album.id);
        listTwo.appendChild(cloneTwo);
      });
      var elem = document.querySelector('.main-carousel');
      new Flickity(elem, {
        // options
        cellAlign: 'center',
        wrapAround: true,
        prevNextButtons: false,
        pageDots: false
      });
    })["catch"](function (error) {
      console.error('error', error);

      if (error) {
        postfetch();
      }
    });
  }
});