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

// Needs to wait for getMovies so have to use async in front of function
async function displayMovies() {

        let data = await getMovies();

        // always going to be same so using const instead of let, 
        const movieListDiv = document.getElementById('movie-list');
        const moviePosterTemplate = document.getElementById('movie-card-template');

        let movies = data.results;

        for (let i = 0; i < movies.length; i++) {

            let movie = movies[i];

            // Get all the child elements to copy over as well when cloneNode(true) if false, then no child elements
            let movieCard = moviePosterTemplate.content.cloneNode(true);

            // Uses a CSS selector to get the element
            let movieImgElement = movieCard.querySelector('.card-img-top');
            movieImgElement.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

            // assigns img src attribute
            let movieTitleElement = movieCard.querySelector('.card-body > h5');
            movieTitleElement.textContent = movie.title;

            // replaces paragraph with summary of
            let movieParagraphElement = movieCard.querySelector('.card-text');
            movieParagraphElement.textContent = movie.overview;

            movieListDiv.appendChild(movieCard);
        } 
}