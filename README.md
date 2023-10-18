![Movie Garden Logo](./img/MovieGarden.svg)
# MovieGarden - A Coding Challenge

A web app that dynamically displays the most popular movies using the TMDB API.

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### Screenshot

Desktop Web App Screenshot:
![Desktop Screenshot](./img/...t.png)

Mobile Web App Screenshot:
<br/>
<img src="./img/....JPG" alt="Mobile Screenshot" width="25%" height="auto">

### Links

- Live Site URL: [Netlify](https://superb-hamster-34c5dc.netlify.app/)
- Repo URL: [Github Repo](https://github.com/rebcop/MovieGarden)

## My process

### Built with

- CSS and Bootstrap Layout
- JavaScript Fundamentals
- JavaScript Loops
- JavaScript DOM Manipulation
- Async JavaScript Functions
- JavaScript Fetch & API Usage
- TECH STACK: JavaScript, HTML, CSS, Bootstrap

### What I learned

1. There are functions that take awhile to run. These require the await keyword to be placed before it. If an await keyword is required it needs to be inside an async function. The await keyword allows for the following function to finish doing its job before continuing with the rest of the async function. Below is an example with the fetch function in order to get data from the API.

    ```js
    async function getMovies() {
    ...
        // waiting for fetch to go to a url and come back with the data
        let response = await fetch('https://api.themoviedb.org/3/movie/popular', {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        // changes the string recieved back and parses it into JSON object which is a javascript object in javascript
        let data = await response.json();
        ...
    }
    ```
    
2. Use a try...catch statement to control what happens if something goes wrong when implementing resources from 3rd-party sources. For example using the fetch API to access data about movies. If an error happens, the catch block can be coded to present the user with information about what happened and next possible actions with a great UI experience.
    ```js
    async function getMovies() {

      // attempt to run this code
      try {
  
          // waiting for fetch to go to a url and come back with the data
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
    ```
    
3. When trying to display similar elements on a page where only the content is changing, use HTML templates to easily recreate the elements and replace the content accordingly along with .content.cloneNode(true) on the template element in the DOM.
   ```HTML
   <template id="movie-card-template">
        <div class="col">
            <div class="card h-100">
                <img src="https://image.tmdb.org/t/p/w500/b0Ej6fnXAP8fK75hlyi2jKqdhHz.jpg" class="card-img-top"
                    alt="Movie Poster">
                <div class="card-body">
                    <h5>The Equalizer 3</h5>
                    <p class="card-text">Robert McCall finds himself at home in Southern Italy but he discovers his
                        friends are under the control of local crime bosses. As events turn deadly, McCall knows
                        what he has to do: become his friends' protector by taking on the mafia.</p>
                </div>
                <div class="card-footer text-end">
                    <button class="btn btn-primary">
                        More Info
                    </button>
                </div>
            </div>
        </div>
    </template>
   ```

    ```js
    async function displayMovies() {
    ...

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

            // Add the revised card to the page
            movieListDiv.appendChild(movieCard);
    } 
    ```

### Useful resources

- [W3 Schools](https://www.w3schools.com/js/js_async.asp)
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

## Author

- Check out my portfolio - [Rebecca Copeland](https://rebcop.dev/)
- Message Me - [LinkedIn](https://www.linkedin.com/in/rebcop/)
