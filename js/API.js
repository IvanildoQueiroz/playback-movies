const url_movie =
  "https://api.themoviedb.org/3/discover/movie?api_key=a406b143ca1f900e34b5f94b65620223";
const url_series =
  "https://api.themoviedb.org/3/discover/tv?api_key=a406b143ca1f900e34b5f94b65620223";
const url_upcoming =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=a406b143ca1f900e34b5f94b65620223";
const url_Videos =
  "https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=a406b143ca1f900e34b5f94b65620223";

const movies = document.querySelector(".list-movies");
//const series = document.querySelector(".list-series");
//const search = document.querySelector(".search");

function getApi(url_movie, url_series, url_upcoming, url_Videos) {
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
  const movieUpcomming = fetch(url_upcoming)
    .then((res) => res.json())
    .then((data) => {
      return data.results;
    });
  const allVideos = fetch(url_Videos)
    .then((res) => res.json())
    .then((data) => {
      return data.results;
    });

  Promise.all([moviePromise, seriePromise, movieUpcomming, allVideos])
    .then(([moviesData, seriesData, movieUpcomming, allVideos]) => {
      getMoviesApi(moviesData, seriesData, movieUpcomming, allVideos);
    })
    .catch((error) => {
      console.error("Erro ao buscar dados:", error);
    });
}
getApi(url_movie, url_series, url_upcoming, url_Videos);

function getMoviesApi(mov, ser, up, vid) {
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
    // function getLists() {
    //   const allLits = document.querySelector(".list-movies");
    //   const lists = allLits.querySelectorAll("li");
    //   let i = 0;
    //   setInterval(() => {
    //     if (i >= lists.length) {
    //       i = 0;
    //     }
    //     lists[i].scrollIntoView({
    //       behavior: "smooth",
    //       inline: "start",
    //       block: "nearest",
    //     });
    //     i++;
    //   }, 1000);
    // }
    //getLists();
  }

  function getAllMoviesTheme(mov, ser, up, vid) {
    const listAction = document.querySelector(".action");
    const listTerror = document.querySelector(".terror");
    const listLanc = document.querySelector(".lanc");
    const ArraylistAction = [];
    const ArraylistTerror = [];
    const ArraylistLanc = [];
    const allArrays = [ArraylistAction, ArraylistLanc, ArraylistTerror];

    for (let i = 0; i < mov.length; i++) {
      let [movie, allData] = createElementsList(up[i]);
      //console.log(movie)
      ArraylistLanc.push([movie, allData]);
      listLanc.appendChild(ArraylistLanc[i][0]);
    }

    for (let i = 0; i < mov.length; i++) {
      let [movie, allData] = createElementsList(mov[i]);
      ArraylistAction.push([movie, allData]);
      listAction.appendChild(ArraylistAction[i][0]);
    }
    for (let i = 0; i < ser.length; i++) {
      let [movie, allData] = createElementsList(ser[i]);
      ArraylistTerror.push([movie, allData]);
      listTerror.appendChild(ArraylistTerror[i][0]);
    }

    // allArrays.map((e,i,a)=>{
    //  allArrays[i].map(e=>{
    //   e.addEventListener('click',()=>{
    //     // verificação para o botao console.log(e.parentNode.classList.contains('lanc'))
    //     })
    //  })
    // });

    function createElementsList(data) {
      const li = document.createElement("li");
      let img = document.createElement("img");
      img.setAttribute(
        "src",
        `https://image.tmdb.org/t/p/w500/${data.poster_path})`
      );
      let p = document.createElement("p");
      p.innerHTML = data.title;
      li.appendChild(img);
      li.appendChild(p);

      return [li, data];
    }

    function activeBtn() {
      let current_item_lanc = 0;
      let current_item_action = 0;
      let current_item_terror = 0;
      const btn = document.querySelectorAll(".btn");

      btn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          btn_current = e.target.parentNode.parentNode.classList.value;
          const left = e.target.classList.contains("left");

          if (left && btn_current == "action") {
            current_item_action =
              current_item_action > 0 ? current_item_action - 1 : 0;
          } else if (!left && btn_current == "action") {
            current_item_action =
              current_item_action < ArraylistAction.length - 1
                ? current_item_action + 1
                : ArraylistAction.length - 1;
          }

          if (left && btn_current == "lanc") {
            current_item_lanc =
              current_item_lanc > 0 ? current_item_lanc - 1 : 0;
          } else if (!left && btn_current == "lanc") {
            current_item_lanc =
              current_item_lanc < ArraylistLanc.length - 1
                ? current_item_lanc + 1
                : ArraylistAction.length - 1;
          }

          if (left && btn_current == "terror") {
            current_item_terror =
              current_item_terror > 0 ? current_item_terror - 1 : 0;
          } else if (!left && btn_current == "terror") {
            current_item_terror =
              current_item_terror < ArraylistTerror.length - 1
                ? current_item_terror + 1
                : ArraylistAction.length - 1;
          }

          updateCurrentItem();
        });
      });

      ArraylistLanc.forEach((item, i) => {
        console.log(item);
        item[0].addEventListener("click", () => {
          showDataMovie(item[1]);
          current_item_lanc = i;
          updateCurrentItem();
        });
      });
      ArraylistTerror.forEach((item, i) => {
        item[0].addEventListener("click", () => {
          showDataMovie(item[1]);
          current_item_terror = i;
          updateCurrentItem();
        });
      });
      ArraylistAction.forEach((item, i) => {
        item[0].addEventListener("click", () => {
          showDataMovie(item[1]);
          current_item_action = i;
          updateCurrentItem();
        });
      });

      function updateCurrentItem() {
        ArraylistAction.forEach((item, index) => {
          if (index === current_item_action) {
            item[0].classList.add("current-item");
            item[0].scrollIntoView({
              behavior: "smooth",
              inline: "center",
              block: "nearest",
            });
          } else {
            item[0].classList.remove("current-item");
          }
        });
        ArraylistLanc.forEach((item, index) => {
          if (index === current_item_lanc) {
            item[0].classList.add("current-item");
            item[0].scrollIntoView({
              behavior: "smooth",
              inline: "center",
              block: "nearest",
            });
          } else {
            item[0].classList.remove("current-item");
          }
        });
        ArraylistTerror.forEach((item, index) => {
          if (index === current_item_terror) {
            item[0].classList.add("current-item");
            item[0].scrollIntoView({
              behavior: "smooth",
              inline: "center",
              block: "nearest",
            });
          } else {
            item[0].classList.remove("current-item");
          }
        });
      }

      updateCurrentItem();
    }

    activeBtn();
  }

  getAllMoviesTheme(mov, ser, up, vid);
  cardsMoviesInitial(mov);
}

function actionNavbar() {
  const navBar = document.querySelector("header");
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

function showDataMovie(movie) {
  console.log(movie);
  const screen = document.querySelector("body");
  const fullScreen = document.createElement("div");
  fullScreen.setAttribute("class", "full-screen");

  const image = document.createElement("img");
  image.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/w500/${movie.poster_path})`
  );
  const text = document.createElement("p");
  text.innerHTML = `${movie.overview}`;
  console.log(movie.overview);
  const title = document.createElement("h1");
  title.textContent = movie.title ? movie.title : movie.name;

  fullScreen.appendChild(interfaceShowMovies(image, title, text, fullScreen));

  fullScreen.classList.add("active-full-screen");
  screen.appendChild(fullScreen).scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function interfaceShowMovies(image, data_title, content, fullScreen) {
  const dataMovies = document.createElement("div");
  dataMovies.setAttribute("id", "data-movies");

  const informationLeft = document.createElement("div");
  informationLeft.setAttribute("class", "information-left");
  informationLeft.appendChild(image);

  const informationRight = document.createElement("div");
  informationRight.setAttribute("class", "information-right");

  const button_watch = document.createElement("button");
  button_watch.textContent = "assistir";

  const button_close = document.createElement("button");
  button_close.setAttribute("id", "return-full-screen");
  button_close.textContent = "X";

  // const video = document.createElement('video');
  // video.setAttribute('id','video');
  // video.setAttribute('src','https://www.youtube.com/watch?v=uJL40wlqbGI');

  informationRight.appendChild(data_title);
  informationRight.appendChild(content);

  informationRight.appendChild(button_watch);
  informationRight.appendChild(button_close);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fullScreen.remove();
  });

  button_close.addEventListener("click", () => {
    fullScreen.classList.remove("active-full-screen");
    fullScreen.remove();
  });

  //button.addEventListener()
  dataMovies.appendChild(informationLeft);
  dataMovies.appendChild(informationRight);
  //dataMovies.appendChild(video)

  return dataMovies;
}
