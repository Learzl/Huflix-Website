// Sample film data
const films = JSON.parse(localStorage.getItem('films')) || [
    {
        title: "Film 1",
        embedLink: "https://uqload.ws/embed-fgjfmafeasoo.html"
    },
    {
        title: "Film 2",
        embedLink: "https://uqload.ws/embed-fgjfmafeasoo.html"
    },
    {
        title: "Film 3",
        embedLink: "https://uqload.ws/embed-fgjfmafeasoo.html"
    }
];

// Function to display films on the home page
function displayFilms() {
    const filmList = document.getElementById('film-list');
    films.forEach((film, index) => {
        const filmCard = document.createElement('div');
        filmCard.className = 'film-card';
        filmCard.innerHTML = `
            <h3>${film.title}</h3>
            <a href="film.html?title=${encodeURIComponent(film.title)}">Watch Now</a>
            <button class="delete-button" onclick="deleteFilm(${index})">Delete</button>
        `;
        filmList.appendChild(filmCard);
    });
}


// Function to display film details on the film detail page
function displayFilmDetails() {
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');
    const film = films.find(film => film.title === title);
    const filmDetails = document.getElementById('film-details');
    if (film) {
        filmDetails.innerHTML = `
            <h1>${film.title}</h1>
            <iframe src="${film.embedLink}" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="100%" height="80vh" allowfullscreen></iframe>
        `;
    } else {
        filmDetails.innerHTML = `<p>Film not found</p>`;
    }
}


// Function to handle search
function handleSearch() {
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        const filmList = document.getElementById('film-list');
        filmList.innerHTML = '';
        films.filter(film => film.title.toLowerCase().includes(query)).forEach((film, index) => {
            const filmCard = document.createElement('div');
            filmCard.className = 'film-card';
            filmCard.innerHTML = `
                <h3>${film.title}</h3>
                <a href="film.html?title=${encodeURIComponent(film.title)}">Watch Now</a>
                <button class="delete-button" onclick="deleteFilm(${index})">Delete</button>
            `;
            filmList.appendChild(filmCard);
        });
    });
}

// Function to handle adding a new film
function handleAddFilm() {
    const addFilmForm = document.getElementById('add-film-form');
    if (addFilmForm) {
        addFilmForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const title = document.getElementById('film-title').value;
            const embedLink = document.getElementById('film-link').value;
            if (title && embedLink) {
                films.push({ title, embedLink });
                localStorage.setItem('films', JSON.stringify(films));
                alert('Film added successfully!');
                displayFilmDetails({ title, embedLink }); // display the newly added film in full screen
            } else {
                alert('Please fill in both fields.');
            }
        });
    }
}

// Function to handle deleting a film
function deleteFilm(index) {
    if (confirm('Are you sure you want to delete this film?')) {
        films.splice(index, 1);
        localStorage.setItem('films', JSON.stringify(films));
        window.location.reload();
    }
}

// Initialize the page based on the URL
window.onload = function() {
    if (document.getElementById('film-list')) {
        displayFilms();
        handleSearch();
    } else if (document.getElementById('film-details')) {
        displayFilmDetails();
    } else if (document.getElementById('add-film-form')) {
        handleAddFilm();
    }
};

// Function to display the newly added film in full screen
function displayNewlyAddedFilm(title, embedLink) {
    const filmDetails = document.getElementById('film-details');
    filmDetails.innerHTML = `
        <h1>${title}</h1>
        <iframe src="${embedLink}" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" width="100%" height="80vh" allowfullscreen></iframe>
    `;
    window.history.pushState({}, '', `film.html?title=${encodeURIComponent(title)}`);
}
