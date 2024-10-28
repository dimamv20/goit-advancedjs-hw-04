import axios from 'axios';

const API_KEY = '46669299-ebb68efeed7427af4171916f3';
const BASE_URL = 'https://pixabay.com/api/';
const MAX_IMAGES = 45;

export const fetchImages = async (query, page = 1, perPage = 15) => {
    const remainingImages = MAX_IMAGES - (page - 1) * perPage;
    if (remainingImages <= 0) return { hits: [], totalHits: 0 };


    perPage = Math.min(perPage, remainingImages);

    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

    try {
        const response = await axios.get(url);
        return response.data; 
    } catch (error) {
        throw new Error('Помилка завантаження зображень');
    }
};
