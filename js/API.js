const url_movie =
  "https://api.themoviedb.org/3/discover/movie?api_key=a406b143ca1f900e34b5f94b65620223";
const url_series =
  "https://api.themoviedb.org/3/discover/tv?api_key=a406b143ca1f900e34b5f94b65620223";
const movies = document.querySelector(".list-movies");
function getApi(url_movie, url_series) {
  const seriePromise = fetch(url_series)
    .then((res) => res.json())
    .then((data) => {
      return data.results;
    });
  const moviePromise = fetch(url_movie)
    .then((res) => res.json())
    .then((data) => {
      return data.results;
    });
  Promise.all([moviePromise, seriePromise])
    .then(([moviesData, seriesData]) => {
      getMoviesApi(moviesData, seriesData);
    })
    .catch((error) => {
      console.error("Erro ao buscar dados:", error);
    });
}
getApi(url_movie, url_series);

function getMoviesApi(mov, ser) {
  function cardsMoviesInitial(mov, ser) {
    for (let i = 0; i <= 2; i++) {
      const li = document.createElement("li");
      let title = document.createElement("h2");
      title.innerHTML = mov[i].title;
      let img = document.createElement("img");
      img.setAttribute(
        "src",
        `https://image.tmdb.org/t/p/w500/${mov[i].poster_path})`
      );
      let p1 = document.createElement("p");
      if (mov[i].original_language == "en") {
        p1.innerHTML = "English";
      }
      let p2 = document.createElement("p");
      p2.innerHTML = mov[i].overview;
      li.appendChild(title);
      li.appendChild(img);
      li.appendChild(p2);
      li.classList.add("active-movies");
      movies.appendChild(li);
    }
    function getLists() {
      const allLits = document.querySelector(".list-movies");
      const lists = allLits.querySelectorAll("li");
      let i = 0;
      setInterval(() => {
        if (i >= lists.length) {
          i = 0;
        }
        lists[i].scrollIntoView({
          behavior: "smooth",
          inline: "start",
          block: "nearest",
        });
        i++;
      }, 1000);
    }
    //getLists();
  }
  function getAllMoviesTheme(mov) {
    const listAction = document.querySelector(".action");
    const listTerror = document.querySelector(".terror");
    const listLanc = document.querySelector(".lanc");
    const ArraylistAction = [];
    const ArraylistTerror = [];
    const ArraylistLanc = [];
    const allArrays = [ArraylistAction,ArraylistLanc,ArraylistTerror];

    
    
    for (let i = 0; i < mov.length; i++) {
      const li_01 = document.createElement("li");
      let img = document.createElement("img");
      img.setAttribute(
        "src",
        `https://image.tmdb.org/t/p/w500/${mov[i].poster_path})`
      );
      let p = document.createElement("p");
      p.innerHTML = mov[i].title;
      
      li_01.appendChild(img);
      li_01.appendChild(p);
      listAction.appendChild(li_01);
      ArraylistAction.push(li_01)
    }
    for (let i = 0; i < mov.length; i++) {
      const li_02 = document.createElement("li");
      let img = document.createElement("img");
      img.setAttribute(
        "src",
        `https://image.tmdb.org/t/p/w500/${mov[i].poster_path})`
      );
      let p = document.createElement("p");
      p.innerHTML = mov[i].title;

      li_02.appendChild(img);
      li_02.appendChild(p);
      listLanc.appendChild(li_02);
      ArraylistLanc.push(li_02)
    }
    for (let i = 0; i < mov.length; i++) {
      const li_03 = document.createElement("li");
      let img = document.createElement("img");
      img.setAttribute(
        "src",
        `https://image.tmdb.org/t/p/w500/${ser[i].poster_path})`
      );
      let p = document.createElement("p");
      p.innerHTML = mov[i].title;

      li_03.appendChild(img);
      li_03.appendChild(p);
      listTerror.appendChild(li_03);
      ArraylistTerror.push(li_03)
    }
    
    allArrays.map((e,i,a)=>{
     allArrays[i].map(e=>{
      e.addEventListener('click',()=>{
        // verificação para o botao console.log(e.parentNode.classList.contains('lanc'))
        })
     })
    })
    
    function activeBtn() {
      let current_item = 0;
      const btn = document.querySelectorAll(".btn");   
      btn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
         btn_current = (e.target.parentNode).parentNode.classList.value
          console.log(btn_current)
          const left = e.target.classList.contains("left");
          if (left && btn_current == 'action') {
            console.log(left)
            current_item = (current_item > 0) ? current_item - 1 : 0;
          } else if(!left && btn_current == 'action'){
            current_item = (current_item < ArraylistAction.length - 1) ? current_item + 1 : ArraylistAction.length - 1;
          }
          updateCurrentItem();
        });
      });
    
      ArraylistAction.forEach((item, i) => {
        item.addEventListener('click', () => {
          current_item = i;
          updateCurrentItem();
        });
      });
    
      function updateCurrentItem() {
        ArraylistAction.forEach((item, index) => {
          if (index === current_item) {
            item.classList.add('current-item');
            item.scrollIntoView({
              behavior: "smooth",
              inline: "center",
              block: "nearest",
            });
          } else {
            item.classList.remove('current-item');
          }
        });
      }
    
      updateCurrentItem(); 
    }
    
    activeBtn();
  }
  
  getAllMoviesTheme(mov);
  cardsMoviesInitial(mov);
}

function actionNavbar() {
  const navBar = document.querySelector(".navbar");
  const btnClose = document.querySelector("#iconClose");
  const butnOpen = document.querySelector("#menuNavbar");

  btnClose.addEventListener("click", () => {
    navBar.classList.toggle("active-navbar");
  });
  butnOpen.addEventListener("click", () => {
    navBar.classList.add("active-navbar");
  });
}
actionNavbar();
