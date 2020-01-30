document.addEventListener('DOMContentLoaded', function() {
    let audioArray = document.getElementsByClassName('aplayer');
    let nowPlaying = audioArray[0];
    let playbutton = document.querySelector('.playbutton')
    console.log(nowPlaying)

    playbutton.addEventListener('click', () => {
        if(!playbutton.classList.contains('fa-pause')){
            nowPlaying.play();
            playbutton.classList.add('fa-pause')
            playbutton.classList.remove('fa-caret-right')
        } else{
            nowPlaying.pause();
            playbutton.classList.remove('fa-pause')
            playbutton.classList.add('fa-caret-right')
        }
    })
})