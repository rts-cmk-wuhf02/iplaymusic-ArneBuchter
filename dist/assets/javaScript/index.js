"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var colors = ["#4D1F48", "#D70060", "#E54028", "#F18D05", "#F2BC06", "#5EB11C", "#3A7634", "#0ABEBE", "#00A1CB", "#115793", "#FF1168", "#111625", "#4D1F48", "#D70060", "#E54028", "#F18D05", "#F2BC06", "#5EB11C", "#3A7634", "#0ABEBE", "#00A1CB", "#115793", "#FF1168", "#111625"];
  var catLink = document.querySelector('.categories__Wrapper');

  if (sessionStorage.getItem("access_token") != undefined) {
    getfetch();
    getCategoriFetch();
  } else {
    postfetch();
  }

  console.log(sessionStorage);

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
      /* console.log('POST', data); */

      sessionStorage.setItem("access_token", token);
      getfetch();
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
    }).then(function (data) {
      /*    console.log(data);
         console.log(sessionStorage.access_token); */
    })["catch"](function (error) {
      console.error('error', error);

      if (error) {
        postfetch();
      }
    });
  }

  function getCategoriFetch() {
    fetch("https://api.spotify.com/v1/browse/new-releases", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + sessionStorage.access_token
      }
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      var template = document.querySelector('.index__template');
      var list = document.querySelector('.index__display');
      data.albums.items.forEach(function (featured) {
        var clone = template.content.cloneNode(true);
        clone.querySelector('.index__display-img').src = featured.images[0].url;
        clone.querySelector('.index__display-text').innerText = featured.name;
        clone.querySelector('.index__display-smtext').innerText = featured.type;
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