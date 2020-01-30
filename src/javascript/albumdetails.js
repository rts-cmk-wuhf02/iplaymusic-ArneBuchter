document.addEventListener('DOMContentLoaded', function() {

    let params = new URLSearchParams(document.location.search);
    const albumId = params.get('id');

    let header = document.querySelector('.header__text');
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

        }).then((response) => response.json())
            .then((data) => {
                let token = data.access_token
                console.log('POST', data)
                sessionStorage.setItem("access_token", token);
                
                getAlbumFetch();

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function getAlbumFetch() {
        fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + sessionStorage.access_token
            }
        
        }).then((response) => response.json())
            .then((data) => {
                let albumImage = document.querySelector('.albumdetails__img');
                let albumTitle = document.querySelector('.albumdetails__songtitle');
                let songCount = document.querySelector('.albumdetails__count');
                
                let listObjectTemplate = document.querySelector('.listobject__template');
                let list = document.getElementsByClassName('listobject')[0];

                albumImage.src = data.images[0].url;
                albumTitle.innerText = data.name;
                songCount.innerHTML = data.total_tracks + " track from " + data.artists[0].name;
        
                data.tracks.items.forEach(function (album) {
                    
                    function millisToMinutesAndSeconds(millis) {
                        var minutes = Math.floor(millis / 60000);
                        var seconds = ((millis % 60000) / 1000).toFixed(0);
                        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
                      }
                      
                    let songduration =  millisToMinutesAndSeconds(album.duration_ms); 
                   
                    let clone = listObjectTemplate.content.cloneNode(true);
                    clone.querySelector('.listobject__info').href = `/player/index.html?id=${album.id}`;
                    clone.querySelector('.listobject__heading').innerHTML = `${album.name}`;
                    clone.querySelector('#artist').innerHTML = `${album.artists[0].name}`;
                    clone.querySelector('.listobject__count').innerHTML = `${songduration}`;
                    list.appendChild(clone);
                }) 

            })
            .catch((error) => {
                console.error('error', error);
                if (error) {
                    postfetch();
                }
            })

    }

});
