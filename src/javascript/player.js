document.addEventListener('DOMContentLoaded', function() {
    let audioArray = document.getElementsByClassName('aplayer');
    let nowPlaying = audioArray[0];
    let playbutton = document.querySelector('.playbutton')
    console.log(nowPlaying)

    playbutton.addEventListener('click', () => {
        nowPlaying.play();
    })
})