// Sample content data
const films = JSON.parse(localStorage.getItem('films')) || [
    {
        title: "Film 1",
        embedLink: "https://uqload.ws/embed-fgjfmafeasoo.html"
    }
];

const series = JSON.parse(localStorage.getItem('series')) || [
    {
        title: "Series 1",
        seasons: {
            "Season 1": [
                { episode: "Episode 1", link: "https://uqload.ws/embed-fgjfmafeasoo.html" },
                { episode: "Episode 2", link: "https://uqload.ws/embed-fgjfmafeasoo.html" }
            ]
        }
    }
];

function displayFilms() {
    const filmList = document.getElementById('film-list');
    filmList.innerHTML = ''; // Clear existing content
    films.forEach((film, index) => {
        const filmCard = document.createElement('div');
        filmCard.className = 'film-card';
        filmCard.innerHTML = `
            <h3>${film.title}</h3>
            <a href="${film.embedLink}" target="_blank">Regarder maintenant</a>
            <button class="delete-button" onclick="deleteFilm(${index})">Supprimer</button>
        `;
        filmList.appendChild(filmCard);
    });
}

function displaySeries() {
    const seriesList = document.getElementById('series-list');
    seriesList.innerHTML = ''; // Clear existing content
    series.forEach((serie, index) => {
        const seriesCard = document.createElement('div');
        seriesCard.className = 'series-card';
        let seasonsHtml = '';
        for (const [season, episodes] of Object.entries(serie.seasons)) {
            let episodesHtml = '';
            episodes.forEach((episode) => {
                episodesHtml += `<option value="${episode.link}" data-index="${index}" data-season="${season}" data-episode="${episode.episode}">${episode.episode}</option>`;
            });
            seasonsHtml += `
                <div class="season">
                    <strong>${season}</strong>
                    <select class="episode-selector" data-index="${index}" data-season="${season}">
                        <option value="">Select Episode</option>
                        ${episodesHtml}
                    </select>
                </div>
            `;
        }
        seriesCard.innerHTML = `
            <h3>${serie.title}</h3>
            ${seasonsHtml}
            <button class="delete-button" onclick="deleteSeries(${index})">Supprimer</button>
        `;
        seriesList.appendChild(seriesCard);
    });
}

function handleSearch() {
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        searchBar.addEventListener('input', (event) => {
            const query = event.target.value.toLowerCase();
            displayFilms();
            displaySeries();
        });
    }
}

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
                window.location.href = 'index.html';
            } else {
                alert('Please fill in both fields.');
            }
        });
    }
}

function handleAddSeries() {
    const addSeriesForm = document.getElementById('add-series-form');
    if (addSeriesForm) {
        addSeriesForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const title = document.getElementById('series-title').value;
            const season = document.getElementById('season').value;
            const episode = document.getElementById('episode').value;
            const embedLink = document.getElementById('series-link').value;
            if (title && season && episode && embedLink) {
                const existingSeries = series.find(serie => serie.title === title);
                if (!existingSeries) {
                    series.push({
                        title,
                        seasons: {
                            [season]: [{ episode, link: embedLink }]
                        }
                    });
                } else {
                    if (!existingSeries.seasons[season]) {
                        existingSeries.seasons[season] = [];
                    }
                    existingSeries.seasons[season].push({ episode, link: embedLink });
                }
                localStorage.setItem('series', JSON.stringify(series));
                alert('Series added successfully!');
                window.location.href = 'index.html';
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
}

function deleteFilm(index) {
    if (confirm('Etes vous sûr de vouloir supprimer ce film ?')) {
        films.splice(index, 1);
        localStorage.setItem('films', JSON.stringify(films));
        displayFilms();
    }
}

function deleteSeries(index) {
    if (confirm('Etes vous sûr de vouloir supprimer cette série ?')) {
        series.splice(index, 1);
        localStorage.setItem('series', JSON.stringify(series));
        displaySeries();
    }
}

function handleSeasonChange(event) {
    const selector = event.target;
    const episodeLink = selector.value;
    if (episodeLink) {
        window.open(episodeLink, '_blank');
    }
}

window.onload = () => {
    if (document.getElementById('film-list')) {
        displayFilms();
        handleSearch();
    }
    if (document.getElementById('series-list')) {
        displaySeries();
    }
    if (document.getElementById('add-film-form')) {
        handleAddFilm();
    }
    if (document.getElementById('add-series-form')) {
        handleAddSeries();
    }

    document.querySelectorAll('.episode-selector').forEach(selector => {
        selector.addEventListener('change', handleSeasonChange);
    });
};
