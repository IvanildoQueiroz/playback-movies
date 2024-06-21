const body = document.querySelector('body');
var movieSearchPanel = false;

const url_movie =
  "https://api.themoviedb.org/3/discover/movie?api_key=a406b143ca1f900e34b5f94b65620223";
const url_series =
  "https://api.themoviedb.org/3/discover/tv?api_key=a406b143ca1f900e34b5f94b65620223";
const url_upcoming =
"https://api.themoviedb.org/3/movie/top_rated?api_key=a406b143ca1f900e34b5f94b65620223";

const movies = document.querySelector(".list-movies");
//const series = document.querySelector(".list-series");
//const search = document.querySelector(".search");

async function getApi(url_movie, url_series, url_upcoming) {
  const seriePromise = await fetch(url_series)
  .then((res) => res.json())
    .then((data) => {
      return data.results;
    });
  const moviePromise = await fetch(url_movie)
    .then((res) => res.json())
    .then((data) => {
      return data.results;
    });
  const movieUpcomming = await fetch(url_upcoming)
    .then((res) => res.json())
    .then((data) => {
      return data.results;
    });
    
    await Promise.all([moviePromise, seriePromise, movieUpcomming])
    .then(([moviesData, seriesData, movieUpcomming]) => {
      getMoviesApi(moviesData, seriesData, movieUpcomming);
    })
    .catch((error) => {
      console.error("Erro ao buscar dados:", error);
    });
}
getApi(url_movie, url_series, url_upcoming);

function getMoviesApi(mov, ser, up) {
  function cardsMoviesInitial(mov, ser) {

    for (let i = 0; i <= 2; i++) {
      const li = document.createElement("li");
      let title = document.createElement("h2");
      title.innerHTML = mov[i].title;
      let img = document.createElement("img");
      img.setAttribute(
        "src",
        `https://image.tmdb.org/t/p/w500/${mov[i].poster_path}`
);
      let p2 = document.createElement("p");
      p2.innerHTML = mov[i].overview;
      let dataForDescription = document.createElement("div");
      dataForDescription.appendChild(title);
      dataForDescription.appendChild(p2);

      li.appendChild(img);
      li.appendChild(dataForDescription);
      li.classList.add("active-movies");
      movies.appendChild(li);

      li.addEventListener('click',()=>{
        document.querySelector('body').style.overflow='hidden';
        showDataMovie(mov[i]).scrollIntoView({
          behavior: "smooth"
        })
      })
      
    }
    function getLists() {
      let count = 1;
      let previousCount = 1;
      const intervalTime = 5000;
      const radioButtons = document.querySelectorAll('.btn-radio');
    
      function setChecked(buttonId) {
        document.querySelector(`#${buttonId}`).checked = true;
      }
    
      function handleRadioButtonClick(e) {
        const el = e.target.id;
        count = el === 'btn_1' ? 1 : el === 'btn_2' ? 2 : 3;
      }
    
      function initializeRadioButtons() {
        radioButtons.forEach(item => {
          item.addEventListener('click', handleRadioButtonClick);
        });
      }
    
      function autoSwitchButtons() {
        setInterval(() => {
          previousCount = count;
          count = count > 2 ? 1 : count + 1;
          setChecked(`btn_${count}`);
        }, intervalTime);
      }
    
      setChecked('btn_1');
      initializeRadioButtons();
      autoSwitchButtons();
    }
    
    getLists();
  }
  

  function getAllMoviesTheme(mov, ser, up) {

    const listAction = document.querySelector(".action");
    const listTerror = document.querySelector(".terror");
    const listLanc = document.querySelector(".lanc");
    const ArraylistAction = [];
    const ArraylistTerror = [];
    const ArraylistLanc = [];
    const allArrays = [ArraylistAction, ArraylistLanc, ArraylistTerror];

    for (let i = 0; i < mov.length; i++) {
      let [movie, allData] = createElementsList(up[i]);

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
      //li.appendChild(p);

      return [li, data];
    }
    function showDataGeneresOfMovie(){
      const allGeneres = document.querySelectorAll('.navType')
      allGeneres.forEach((e,i)=>{
        e.addEventListener('click',(e)=>{
          const el = e.target.
          className;
            if(el === "list-films")interfaceGeneres(mov,'Filmes');
            if(el === "list-series")interfaceGeneres(ser,'Series');
            if(el === "list-movies-top")interfaceGeneres(up,'Top-Lista'); 
        })
      })
    }
    showDataGeneresOfMovie()


    function interfaceGeneres(movie,typeMovie){

      movieSearchPanel = true;

      body.style.overflow = 'hidden'

      const screen = document.createElement('div');
      screen.setAttribute('class','interfaceGeneres');

      const btnExit = document.createElement('button');
      btnExit.setAttribute('id','btnExit');
      btnExit.textContent = "X";

      const titleTopScreen = document.createElement('h1');
      titleTopScreen.textContent = typeMovie;

      screen.appendChild(btnExit);
      screen.appendChild(titleTopScreen)

      movie.forEach(e=>{
        const li = document.createElement("li");

        let image = document.createElement("img");
        
            image.setAttribute(
              "src",
              `https://image.tmdb.org/t/p/w500${e.poster_path})`
              );

          li.appendChild(image);

          li.addEventListener('click',()=>{
            showDataMovie(e);
            document.querySelector('body').style.overflow='hidden';
          })

          screen.appendChild(li);
         
      })

      body.appendChild(screen);

      btnExit.addEventListener('click',()=>{
        movieSearchPanel = false;
        screen.remove();
        body.style.overflow = 'scroll'
        
      });

    }
    function activeBtn() {
      let current_item_lanc = 0;
      let current_item_action = 0;
      let current_item_terror = 0;
      const btn = document.querySelectorAll(".btn");

      ArraylistLanc.forEach((item, i) => {
        item[0].addEventListener("click", () => {
          document.querySelector('body').style.overflow='hidden';
          showDataMovie(item[1]);
          current_item_lanc = i;
          updateCurrentItem();
        });
      });
      ArraylistTerror.forEach((item, i) => {
        item[0].addEventListener("click", () => {
          document.querySelector('body').style.overflow='hidden';
          showDataMovie(item[1]);
          current_item_terror = i;
          updateCurrentItem();
        });
      });
      ArraylistAction.forEach((item, i) => {
        item[0].addEventListener("click", () => {
          document.querySelector('body').style.overflow='hidden';
          showDataMovie(item[1]);
          current_item_action = i;
          updateCurrentItem();
        });
      });

      function updateCurrentItem() {
        ArraylistAction.forEach((item, index) => {
          if (index === current_item_action) {
            item[0].classList.add("current-item");
            // item[0].scrollIntoView({
            //   behavior: "smooth",
            //   inline: "center",
            //   block: "nearest",
            // });
          } else {
            item[0].classList.remove("current-item");
          }
        });
        ArraylistLanc.forEach((item, index) => {
          if (index === current_item_lanc) {
            item[0].classList.add("current-item");
            // item[0].scrollIntoView({
            //   behavior: "smooth",
            //   inline: "center",
            //   block: "nearest",
            // });
          } else {
            item[0].classList.remove("current-item");
          }
        });
        ArraylistTerror.forEach((item, index) => {
          if (index === current_item_terror) {
            item[0].classList.add("current-item");
            // item[0].scrollIntoView({
            //   behavior: "smooth",
            //   inline: "center",
            //   block: "nearest",
            // });
          } else {
            item[0].classList.remove("current-item");
          }
        });
      }

      updateCurrentItem();
    }

    activeBtn();
  }
  document.querySelector("#findMovie").addEventListener("input", (e) => {
    e.preventDefault();
    let value = e.target.value;
    findMovies(mov, value);
  });

  getAllMoviesTheme(mov, ser, up);
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
  keyVideo = movie.id;

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

  const title = document.createElement("h1");
  title.textContent = movie.title ? movie.title : movie.name;

  fullScreen.appendChild(
    interfaceShowMovies(image, title, text, fullScreen, keyVideo)
  );

  fullScreen.classList.add("active-full-screen");
  screen.scrollIntoView({
    behavior: "smooth",
    inline:"start"
  });
  screen.appendChild(fullScreen)
}

//show interface of films clickeds
function interfaceShowMovies(image, data_title, content, fullScreen, keyVideo) {
  const allDataMovies = document.createElement("div");
  allDataMovies.setAttribute("class", "all-data-movies");

  const title_trailer = document.createElement("h2");
  title_trailer.innerHTML = "Trailer";

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

  informationRight.appendChild(data_title);
  informationRight.appendChild(content);

  informationRight.appendChild(button_watch);
  informationRight.appendChild(button_close);

  //remove interface with details of movies
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fullScreen.remove();
    document.querySelector('body').style.overflow = 'scroll';
  });

  button_close.addEventListener("click", () => {
    fullScreen.classList.remove("active-full-screen");
    fullScreen.remove();

    if(!movieSearchPanel){
      document.querySelector('body').style.overflow = 'scroll';
    }else{
      document.querySelector('body').style.overflow = 'hidden';
    }
  });

  dataMovies.appendChild(informationLeft);
  dataMovies.appendChild(informationRight);
  allDataMovies.appendChild(dataMovies);
  allDataMovies.appendChild(title_trailer);

  const url_Videos = `https://api.themoviedb.org/3/movie/${keyVideo}/videos?api_key=a406b143ca1f900e34b5f94b65620223`;

  fetch(url_Videos)
    .then((res) => res.json())
    .then((data) => {
      return allDataMovies.appendChild(getVideoTrailer(data));
    });

  return allDataMovies;
}

function getVideoTrailer(movie) {
  const video = document.createElement("iframe");
  video.setAttribute("id", "video");
  video.setAttribute("constrols", "true");
  video.setAttribute(
    "src",
    `https://www.youtube.com/embed/${movie.results[0].key}?autoplay=1&mute=0`
  );
  return video;
}


function findInterface(request) {

  const findMovieResult = document.createElement("div");
  findMovieResult.setAttribute("id", "findMovieResult");

  const findMovie = document.querySelector("#findMovie");
  findMovie.focus();
  findMovieResult.innerHTML = '';

  if (request.length === 0) {
    const p = document.createElement("p");
    p.textContent = "Movie not found";
    findMovieResult.appendChild(p);
    findMovie.appendChild(findMovieResult);
    return;
  }
  
  request.forEach((e) => {
    const img = document.createElement("img");
    img.setAttribute("src", `https://image.tmdb.org/t/p/w500/${e.poster_path}`);
    const title = document.createElement("h2");
    title.textContent = e.title;
    
    const button = document.createElement("button");
    button.textContent = "Ver";
    button.addEventListener('click',()=>{
      document.querySelector('body').style.overflow='hidden'
      showDataMovie(e)
    })
    
    const p = document.createElement("p");
    p.textContent = e.overview;
    
    const description = document.createElement("div");
    description.setAttribute("id", "description");
    
    const descriptionCompleted = document.createElement("div");
    descriptionCompleted.setAttribute("id", "descriptionCompleted");

    description.appendChild(title);
    description.appendChild(p);
    description.appendChild(button);
    
    descriptionCompleted.appendChild(img);
    descriptionCompleted.appendChild(description);
    
    findMovieResult.appendChild(descriptionCompleted);
  });

  findMovie.appendChild(findMovieResult);

}
let findMovieResultStatus = false;
document.addEventListener("click", (e) => {
  const el = e.target;
  if (el.id != "find-image" && findMovieResultStatus) {
    findMovieResult.remove();
    findMovieResultStatus = false;
  }
});

function findMovies(mov, result) {
  findMovieResultStatus = true;
  let resultOfFind = [];
  mov.forEach((e, i) => {
    if (e.title.toLowerCase().includes(result.toLowerCase())) {
      resultOfFind.push(e);
    }
  });
  const findImage = document.querySelector("#find-image");
  //const findText = document.querySelector('#find-text');

  findImage.addEventListener("click", () => {
    if (result != ""){ 
      findInterface(resultOfFind);
      result = "";
    };
  });
  
}

function addDataUserlogin(){
  const userLogin = document.querySelector("#nameUser");
  const user =  sessionStorage.getItem('user');
  if(user){
    userLogin.innerHTML = user;

    if(user==='admin'){
      document.querySelector('#photo').style.backgroundImage = "url('../assets/imgAdmin.jpg')";
      //document.querySelector('#photo').style.backgroundColor = "red";
    }
    
  }else{
    document.querySelector('#photo').style.backgroundImage = "url('../assets/imgVisitor.png')";
    userLogin.innerHTML = "Guest";
  }
  

}
addDataUserlogin()

const logout = document.querySelector('#logout');

logout.addEventListener('click', () => {
  sessionStorage.removeItem('user');
  localStorage.removeItem('dataUser')
  window.location.reload();
  
})