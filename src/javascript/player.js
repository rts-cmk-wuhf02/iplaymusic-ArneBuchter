jQuery(document).ready(function() {
    let audioArray = document.getElementsByClassName('aplayer');

    let nowPlaying = audioArray[0];
    console.log(nowPlaying)

    nowPlaying.load();
    $('.player__playicon').on('click', function(){
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
})