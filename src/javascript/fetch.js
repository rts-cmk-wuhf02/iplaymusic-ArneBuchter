document.addEventListener('DOMContentLoaded', function () {
  let colors = ["#4D1F48", "#D70060", "#E54028", "#F18D05", "#F2BC06", "#5EB11C", "#3A7634", "#0ABEBE", "#00A1CB", "#115793", "#FF1168", "#111625"];
  let catLink = document.querySelector('.categories__Wrapper');
  
  catLink.addEventListener("click", function (e) {
    let mainlist = document.querySelector('.categories__mainlist')
    let sublinks = document.querySelector('#sublinks');
    let sublinkOne = document.querySelector('#sublinkOne')
    let sublinkTwo = document.querySelector('#sublinkTwo')
    let sublinkThree = document.querySelector('#sublinkThree')
    let sublinkFour = document.querySelector('#sublinkFour')

  if (e.target.classList.contains('a')){
       mainlist.classList.replace("a", "b");
       sublinks.classList.replace("sublinks", "subshow");        
       sublinkOne.classList.add('subshow')
       sublinkTwo.classList.add('subshow')
       sublinkThree.classList.add('subshow')
       sublinkFour.classList.add('subshow')
       
     }else if(e.target.classList.contains('b')){
      mainlist.classList.replace("b" , "a");
      sublinks.classList.replace("subshow", "sublinks");
      sublinkOne.classList.remove('subshow')
      sublinkTwo.classList.remove('subshow')
      sublinkThree.classList.remove('subshow')
      sublinkFour.classList.remove('subshow')
    } 
  });

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
      getPostFetch();
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
    fetch("https://api.spotify.com/v1/browse/categories", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + sessionStorage.access_token
      }
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      let categoriTemplate = document.querySelector('.categories__template');
      let list = document.getElementsByClassName('categories__Wrapper')[0];
/*       console.log(sessionStorage.access_token);
      console.log(data.categories.items); */
      data.categories.items.forEach(function (categori, id) {
        let clone = categoriTemplate.content.cloneNode(true);
        clone.querySelector('.categories__mainlist').style.backgroundColor = colors[id];
        clone.querySelector('.dalink').innerText = "".concat(categori.name);
        clone.querySelector('.icon');
        clone.querySelector('.sublinks');
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