document.addEventListener('DOMContentLoaded', function () {

    if (sessionStorage.getItem("access_token") != undefined) {

        getfetch();
        getPlaylistFetch();

    } else {

        postfetch();

    }
    //console.log(sessionStorage)
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
             //   console.log('POST', data)
                sessionStorage.setItem("access_token", token);
                getfetch();
                getPlaylistFetch();

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function getfetch() {
        fetch("https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + sessionStorage.access_token
            }

        }).then((response) => response.json())
            .then((data) => {
        //        console.log(data)
       //         console.log(sessionStorage.access_token)
            })
            .catch((error) => {
                console.error('error', error);

            })
    }

    function getPlaylistFetch() {
        fetch("https://api.spotify.com/v1/browse/featured-playlists?country=SE&limit=20", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + sessionStorage.access_token
            }

        }).then((response) => response.json())
            .then((data) => {
                
                let playlistName = document.querySelector('.playlists__heading');
                let swiperTemplate = document.querySelector('.carusel__template');
                let listOne = document.getElementsByClassName('main-carousel')[0];
                data.playlists.items.forEach(function (playlists, i) {
                     //   console.log(data.playlists.items[i].tracks)
                        let cloneOne = swiperTemplate.content.cloneNode(true);
                        cloneOne.querySelector('.swiper__img').src = `${playlists.images[0].url}`;
                        cloneOne.querySelector('.swiper__img').setAttribute("data-apiendpoint", data.playlists.items[i].tracks.href);
                        cloneOne.querySelector('.swiper__img').setAttribute("alt", data.playlists.items[i].name);
                        listOne.appendChild(cloneOne);

                })


                //swiper
                
                var elem = document.querySelector('.main-carousel');
                let flkty = new Flickity(elem, {
                    // options
                    cellAlign: 'center',
                    wrapAround: true,
                    prevNextButtons: false,
                    pageDots: false,
                    on: {                   //chosen img on load
                        ready: function(){
                            
                            let url = document.querySelector('.is-selected').children[0].dataset.apiendpoint;
                            let readyName = document.querySelector('.is-selected').children[0].alt;
                            playlistName.innerHTML = readyName

                            trackFetch (url)
                        },
                    
                        change: function(){     //chosen img when swiped
                            
                            deleteChild();
                            let url = document.querySelector('.is-selected').children[0].dataset.apiendpoint;
                            let changeName = document.querySelector('.is-selected').children[0].alt;
                            console.log(url)
                            playlistName.innerHTML = changeName
                            trackFetch(url)
                        }
                    }

                })
                flkty.on( 'select', function( index ) {
                    console.log(this)
                });
            })
            .catch((error) => {
                console.error('error', error);
                if (error) {
                    postfetch();
                }
            })
    }

    function trackFetch (url) {
        fetch(url, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + sessionStorage.access_token
            }

            }).then((response) => response.json())
                .then((data) => {   
                    //console.log(data.items)
                    let listObjectTemplate = document.querySelector('.listobject__template');
                    let listTwo = document.getElementsByClassName('listobject')[0];
                    data.items.forEach(function (playlists, i) {
                        console.log(playlists.track.artists[0].name)
                        let cloneTwo = listObjectTemplate.content.cloneNode(true);
                        cloneTwo.querySelector('.listobject__img').src = `${playlists.track.album.images[2].url}`;
                        cloneTwo.querySelector('.listobject__heading').innerHTML = `${playlists.track.name}`;
                        cloneTwo.querySelector('#artist').innerHTML = `${playlists.track.artists[0].name}`;
                        listTwo.appendChild(cloneTwo);
                    }) 
            })
    }

    function deleteChild() {    //clear the template in trackFetch
        let e = document.querySelector('.listobject');
        let child = e.lastElementChild;
        while(child) {
            e.removeChild(child);
            child = e.lastElementChild;
        }
    }

}) 
