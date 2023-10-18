const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjQyMmQ4ZTc3YTczYTU2ZWJjNjBhYTliZjBkNjdjNiIsInN1YiI6IjY1MmVlMTg5YTgwMjM2MDBlMGFjNzg3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cujIti81xy50tbwjxfJiN5xOsCAg2HsLfueUwYFJlCI";

// Calls the API and gets the movies, async tells it to wait 
async function getMovies() {

    // attempt to run this code, used when incorporating information from other people so it doesn't break our code, not for your own code that you can control
    try {

                        // waiting for asyncronous operation to go to a url and comes back with a response
        let response = await fetch('https://api.themoviedb.org/3/movie/popular', {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        // changes the string recieved back and parses it into JSON object which is a javascript object in javascript
        let data = await response.json();

        return data;

        // if something goes wrong, run this backup code
    } catch (error) {
        console.error(error);
    }
}

async function getMovie(movieId) {

        // attempt to run this code, used when incorporating information from other people so it doesn't break our code, not for your own code that you can control
    try {

                        // waiting for asyncronous operation to go to a url and comes back with a response
        let response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        // changes the string recieved back and parses it into JSON object which is a javascript object in javascript
        let data = await response.json();

        return data;

        // if something goes wrong, run this backup code
    } catch (error) {
        console.error(error);
    }

}

// Needs to wait for getMovies so have to use async in front of function
async function displayMovies() {

        let data = await getMovies();

        // always going to be same so using const instead of let, 
        const movieListDiv = document.getElementById('movie-list');
        const moviePosterTemplate = document.getElementById('movie-card-template');

        let movies = data.results;

        for (let i = 0; i < movies.length; i++) {

            let movie = movies[i];

            // Get all the child elements to copy over as well when cloneNode(true), if false instead of true is used, then no child elements
            let movieCard = moviePosterTemplate.content.cloneNode(true);

            // Uses a CSS selector to get the element and reassign the value of the img src attribute
            let movieImgElement = movieCard.querySelector('.card-img-top');
            movieImgElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

            // Get the element holding the movie title and replace the text with the title of the movie
            let movieTitleElement = movieCard.querySelector('.card-body > h5');
            movieTitleElement.textContent = movie.title;

            // Get the element holding the paragraph information and replace the text with the summary of movie
            let movieParagraphElement = movieCard.querySelector('.card-text');
            movieParagraphElement.textContent = movie.overview;

            // Make up own attribute to assign movie id to access this information later
            let movieButton = movieCard.querySelector('.btn-primary');
            movieButton.setAttribute('data-movieId', movie.id);

            // Add the revised card to the page
            movieListDiv.appendChild(movieCard);
        } 
}


async function showMovieDetails(clickedBtn) {

    // get the ID of the movie that was clicked
    let movieId = clickedBtn.getAttribute('data-movieId');

    // TODO:
    // get the details of the movie with that ID from TMBD API
    let movieData = await getMovie(movieId);

    // Modify Content in Headaer of Modal
    let modalTitle = document.querySelector('#movieModal .modal-title');
    modalTitle.textContent = movieData.title;

    let modalTagline = document.querySelector('#movieModal .tagline');
    modalTagline.textContent = `TAGLINE: ${movieData.tagline}`;

    // Modify Content in Body of Modal
    let modalBody = document.querySelector('#movieModal .modal-body');
    modalBody.textContent = movieData.overview;
        
    // Modify Content in Footer of Modal
    let modalFooter = document.querySelector('#movieModal .modal-footer');

    let moviePageBtn = document.querySelector('#movieModal .btn-primary');
    moviePageBtn.href = movieData.homepage;

    // WANT: collection(maybe after), genres[], original_language, popularity, poster_path
    // release date, runtime, vote avg, vote count

}