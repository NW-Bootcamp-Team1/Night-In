// div selectors
var zone = document.querySelector("#movies")
var book = document.querySelector("#books")
var game = document.querySelector("#boardgames")
// not being used
// var outlineHeart = document.querySelector(".outlineHeart")
var heartBtn = document.querySelector("#heartBtn")

var categories = [mystery = {m:'9648', b:'mystery', g:'BBZb2d0ePt'},
                  horror = {m:'27', b:'horror', g:'cAIkk5aLdQ'},
                  family = {m:'10751', b:'young_adult_fiction', g:'7rV11PKqME'},
                  sciFi = {m:'878', b:'science_fiction', g:'3B3QpKvXD3'},
                  adventure = {m:'12', b:'fantasy', g:'KUBCKBkGxV'}]
// default category for testing results page
var genre = categories[0];
// generate movie name and poster
function getMovieOptions(){
  // movieGenreAPIURL = "https://api.themoviedb.org/3/genre/movie/list?api_key=e346bd747060c7a18ce3926d8f5571b9&language=en-US"
  var movieURL = "https://api.themoviedb.org/3/discover/movie?api_key=3b1bc545c2aff630803e3dfd3ac89e2e&with_genres=<genre>&page=1"
  var posterPath = "https://image.tmdb.org/t/p/original/"
  movieURL = movieURL.replace('<genre>',genre.m)
  movieModal = document.querySelector('#movieModal')

  // Movie API (Aumio)
  fetch(movieURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var randomMovie = Math.floor(Math.random()*20)
      // console.log(randomMovie)
      
      var title = document.createElement("h4");
      var poster = document.createElement("img");
      var modalTitle = movieModal.children[0].children[0]
      var modalDescription = movieModal.children[0].children[1]

      var currentMovie = data.results[randomMovie];

      title.textContent = currentMovie.title;
      modalTitle.textContent = currentMovie.title;
      poster.src = posterPath.concat(currentMovie.poster_path);
      poster.setAttribute("style", "width:25%");
      modalDescription.textContent = currentMovie.overview;

      zone.appendChild(title);
      zone.appendChild(poster);
      // zone.appendChild(description);
        
      function fillHeartMovie(){
        console.log("HEART MOVIE")
        var movieHeart = document.getElementById("movieHeart")
        console.log(movieHeart)
        movieHeart.classList.remove("fa-regular")
        movieHeart.classList.add("fa-solid")
        // SETTING MOVE TO LOCAL STORAGE
        localStorage.setItem("MOVIE",[currentMovie.title,currentMovie.poster_path])
      }
      movieHeart.addEventListener("click",fillHeartMovie)
      movieURL = movieURL.replace(genre.m,'<genre>')
  });
}

// generate book name and cover
function getBookOptions(){
// Book API (Grayson)
// https://openlibrary.org/dev/docs/api/covers

var bookModal = document.querySelector("#bookModal")
var url = "http://openlibrary.org/subjects/genre.json";
var coverPath = "https://covers.openlibrary.org/b/id/";

url = url.replace('genre',genre.b)

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    var randomBook = Math.floor(Math.random()*12)

    var title = document.createElement("h4");
    var cover = document.createElement("img");
    var bookTitle = bookModal.children[0].children[0]
    var bookDescription = bookModal.children[0].children[1]

    var newBook = data.works[randomBook];

    title.textContent = newBook.title;
    bookTitle.textContent = newBook.title
    cover.src = coverPath.concat(newBook.cover_id,'-L.jpg');
    cover.setAttribute("style", "width: 25%");
    bookDescription.setAttribute('href',`https://openlibrary.org${newBook.key}`)
    // bookDescription.innerText("Click here for link to full information")

    book.appendChild(title);
    book.appendChild(cover);

    function fillHeartBook(){
      console.log("HEART BOOK")
      var bookHeart = document.getElementById("bookHeart")
      // console.log(bookHeart)
      bookHeart.classList.remove("fa-regular")
      bookHeart.classList.add("fa-solid")
      // SETTING book TO LOCAL STORAGE
      localStorage.setItem("BOOK",[newBook.title,coverPath.concat(newBook.cover_id,'-L.jpg')])
    }
    bookHeart.addEventListener("click",fillHeartBook)
    url = url.replace(genre.b,'genre')
  });
}
// generate game name and related poster/box
function getGameOptions(){
  // gameAPI (Holly)
  var gameURL = "https://api.boardgameatlas.com/api/search?categories=genre&client_id=j93pbu8wKv"
  var gameModal = document.querySelector("#gameModal")
  gameURL = gameURL.replace('genre',genre.g)

  fetch(gameURL)
      .then(function (response) {
          return response.json()
      })
      .then(function (data) {
          console.log(data)

          var randomGame = 25
          if(genre = mystery){
            randomGame -=10
          }

          var randomGame = Math.floor(Math.random()*randomGame)
          
          var title = document.createElement('h4')
          var poster = document.createElement('img')
          var modalTitle = gameModal.children[0].children[0]
          var description = gameModal.children[0].children[1]

          var currentGame = data.games[randomGame]
          console.log(currentGame)
          title.textContent = currentGame.name
          modalTitle.textContent = currentGame.name
          poster.src = (currentGame.image_url)
          poster.setAttribute('style','width:25%')
          description.textContent = currentGame.description_preview

          game.appendChild(title)
          game.appendChild(poster)
          // game.appendChild(description)
          // SETTING GAME TO LOCAL STORAGE
              
          function fillHeartGame(){
            console.log("HEART")
            var gameHeart = document.getElementById("heartBtn")
            console.log(gameHeart)
            gameHeart.classList.remove("fa-regular")
            gameHeart.classList.add("fa-solid")
            localStorage.setItem("GAME",[currentGame.name,currentGame.image_url])
          }
          heartBtn.addEventListener("click",fillHeartGame)
          gameURL = gameURL.replace(genre.g,'genre')
      })
}

// temporary for testing within results.html only
if(localStorage.getItem('category')){
  genre = categories[localStorage.getItem('category')]
}

var bookRefresh = book.children[1]
var movieRefresh = zone.children[1]
var gameRefresh = game.children[1]

bookRefresh.addEventListener('click',function(){
  // console.log('nice')
  console.log(book.childNodes)
  var items = 2
  while(items>0){
    book.removeChild(book.lastChild)
    items--
  }
  getBookOptions()
})

movieRefresh.addEventListener('click',function(){
  var items = 2
  while(items>0){
    zone.removeChild(zone.lastChild)
    items--
  }
  getMovieOptions()
})

gameRefresh.addEventListener('click',function(){
  var items = 2
  while(items>0){
    game.removeChild(game.lastChild)
    items--
  }
  getGameOptions()
})

getMovieOptions()
getBookOptions()
getGameOptions()