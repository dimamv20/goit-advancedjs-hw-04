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
        const images = await fetchImages(query, currentPage);
        if (images.length === 0 && currentPage === 1) {
            showNoResultsMessage();
            return;
        }

        renderImages(images);

        
        if (images.length > 0) {
            loadMoreButton.style.display = 'block';
        }

    } catch (error) {
        console.error(error);
    } finally {
        loadingIndicator.remove();
    }
}
