"use strict";

var theme = document.querySelector('.theme');
var changeTheme = document.querySelector('.change-theme');
var hero = document.querySelector('.hero');
var footer = document.querySelector('.footer');
var albums = document.querySelector('.alf');
var playlists = document.querySelector('.pf');
var index = document.querySelector('.if');
var cat = document.querySelector('.fc');
var header = document.querySelector('.header');
theme.addEventListener('click', function () {
  changeTheme.classList.toggle('dark__theme');

  if (hero != null) {
    hero.classList.toggle('dark__hero');
  }

  footer.classList.toggle('dark__hero');

  if (albums) {
    albums.classList.toggle('alfd');
  }

  if (playlists) {
    playlists.classList.toggle('pfd');
  }

  if (index) {
    index.classList.toggle('ifd');
  }

  if (cat) {
    cat.classList.toggle('fcd');
  }

  header.classList.toggle('header_dark');
});