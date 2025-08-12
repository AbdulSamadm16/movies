import { moviesData } from "./data.js"

const moodRadio = document.getElementById("mood-radios")
const getMovieBtn = document.getElementById("get-movie-btn")
const classicsOnlyOption = document.getElementById("classics-only-option")
const movieModelInner = document.getElementById("movie-modal-inner")
const movieModal = document.getElementById("movie-modal")
const closeBtn = document.getElementById("movie-modal-close-btn")


moodRadio.addEventListener("change",highlightCheckedOption)
getMovieBtn.addEventListener("click",renderMovie)

closeBtn.addEventListener("click",function(){
  movieModal.style.display = "none"
})


function renderMovie(){
  const movieObject = getsingleMovieObject()
  movieModelInner.innerHTML = `<img class = "movie-poster" src="${movieObject.poster}"/> <h3 class = "movie-title">${movieObject.title}</h3> <p class="movie-details">year : ${movieObject.year}<p>  <p class="movie-details">Rating:${movieObject.rating}</p> <p class ="movie-genre ">${movieObject.genre}</p>`
  
  movieModal.style.display = "flex"
}

function getsingleMovieObject(){
  const moviesArray = getMatchingMovieArray()
  if(moviesArray.length===1){
    return moviesArray[0]
  }else{
    const randomNumber = Math.floor(Math.random(moviesArray)* moviesArray.length)
    return moviesArray[randomNumber]
  }
 
}


function getMatchingMovieArray(){
  if(document.querySelector(`input[type = "radio"]:checked`)){
    const isGif = classicsOnlyOption.checked;
    // console.log(isGif)
    // console.log(document.querySelector(`input[type = "radio"]:checked`).value)

    const selectedMood = document.querySelector(`input[type = "radio"]:checked`).value
    const matchingMovieArray = moviesData.filter(function(movies){
      // return cat.emotionTags.includes(selectedEmotion)
      if(isGif){
              return movies.moodTags.includes(selectedMood) && movies.isClassic === true
      }else{
        return movies.moodTags.includes(selectedMood)
      }   
    })
   return matchingMovieArray
  }
}

function highlightCheckedOption(e){
  const radios = document.getElementsByClassName("radio")
  for(let radio of radios){
    radio.classList.remove("highlight")
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight")
}

function getMoviesArray(movies){
  const moviesArray =[]
  for(let movie of movies){
  for(let mood of movie.moodTags){
 if(!moviesArray.includes(mood)){
  moviesArray.push(mood)
 }
  }
}
return moviesArray

}
function renderMoviesRadio(movies){
  let movieList = ""
  const moods = getMoviesArray(movies)
  .sort((a, b) => a.localeCompare(b));
  for(let mood of moods){
    movieList += `<div class="radio">
    <input type ="radio" id = "${mood}" value = "${mood}" name ="emotions"/>
    <label for="${mood}">${mood}</label>    
    </div>`
  }
  moodRadio.innerHTML = movieList
}
renderMoviesRadio(moviesData)
