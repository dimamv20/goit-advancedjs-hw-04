import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.getElementById('search-form');
const searchField = document.getElementById('search-field');
const loadMoreButton = document.getElementById('load-more');
const listPhotos = document.querySelector('.list-photos');
const loadingIndicator = document.createElement('div');
loadingIndicator.textContent = 'Завантаження...';
loadingIndicator.classList.add('loading-indicator');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
let lightbox = new SimpleLightbox('.list-photos a'); 

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const query = searchField.value.trim();
    if (!query) return;

    currentPage = 1;
    currentQuery = query;
    listPhotos.innerHTML = '';
    loadMoreButton.style.display = 'none';

    await performSearch(query);
    searchField.value = ''; 
});

loadMoreButton.addEventListener('click', async () => {
    currentPage += 1;
    await performSearch(currentQuery);
});

async function performSearch(query) {
    document.body.appendChild(loadingIndicator);

    try {
        const response = await fetchImages(query, currentPage);
        const images = response.hits;
        totalHits = response.totalHits;

        if (images.length === 0 && currentPage === 1) {
            showNoResultsMessage();
            return;
        }

        renderImages(images);
        lightbox.refresh(); 

        const totalLoadedImages = document.querySelectorAll('.list-photos img').length;
        if (totalLoadedImages >= totalHits || totalLoadedImages >= 45) { 
            loadMoreButton.style.display = 'none';
            showEndOfResultsMessage();
        } else {
            loadMoreButton.style.display = 'block';
        }


        const cardHeight = document.querySelector('.list-photos li').getBoundingClientRect().height;
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth'
        });

    } catch (error) {
        console.error(error);
    } finally {
        loadingIndicator.remove();
    }
}

function showEndOfResultsMessage() {
    const message = document.createElement('p');
    message.textContent = "We're sorry, but you've reached the end of search results.";
    message.classList.add('end-of-results-message');
    document.body.appendChild(message);
}
