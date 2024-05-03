const url =
  "https://api.themoviedb.org/3/discover/movie?api_key=a406b143ca1f900e34b5f94b65620223";
function getApi(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      getMoviesApi(data.results);
    });
}
getApi(url);

function getMoviesApi(mov) {
  const movies = document.querySelector(".list-movies");

  function cardsMoviesInitial(mov) {
    for (let i = 0; i <= 2; i++) {
      const li = document.createElement("li");
      let title = document.createElement("h2");
      title.innerHTML = mov[i].title;
      let img = document.createElement('img');
      img.setAttribute('src',`https://image.tmdb.org/t/p/w500/${mov[i].poster_path})`);
      let p1 = document.createElement("p");
      if(mov[i].original_language == 'en'){p1.innerHTML = 'English'};
      let p2 = document.createElement("p");
      p2.innerHTML = mov[i].overview;
      li.appendChild(title);
      li.appendChild(img);
      li.appendChild(p1);
      li.appendChild(p2);
      //li.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${mov[i].poster_path})`;
      li.classList.add("active-movies");
      movies.appendChild(li);
    }
  }
  cardsMoviesInitial(mov);
}
function actionNavbar(){
  const navBar = document.querySelector('.navbar');
  const btnClose = document.querySelector('#iconClose');
  const butnOpen = document.querySelector('#menuNavbar');

  btnClose.addEventListener('click',()=>{
    navBar.classList.toggle('active-navbar');
  })
  butnOpen.addEventListener('click',()=>{
    navBar.classList.add('active-navbar');
   
  })
}
actionNavbar();