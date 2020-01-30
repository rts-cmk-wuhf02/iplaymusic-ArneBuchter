let theme = document.querySelector('.theme');
let changeTheme = document.querySelector('.change-theme');
let hero = document.querySelector('.hero');
let footer = document.querySelector('.footer');
let albums = document.querySelector('.alf');
let playlists = document.querySelector('.pf');
let index = document.querySelector('.if');
let cat = document.querySelector('.fc');
let header = document.querySelector('.header');

theme.addEventListener('click', () => {
    changeTheme.classList.toggle('dark__theme');
    if(hero != null){
    hero.classList.toggle('dark__hero');
    }
    footer.classList.toggle('dark__hero');
    if(albums){
        albums.classList.toggle('alfd');
    }
    if(playlists){
        playlists.classList.toggle('pfd');
    }
    if(index){
        index.classList.toggle('ifd');
    }
    if(cat){
        cat.classList.toggle('fcd');
    }

    header.classList.toggle('header_dark');
})