import axios from 'axios';

const API_KEY = '46669299-ebb68efeed7427af4171916f3';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page = 1, perPage = 15) => {
    const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

    try {
        const response = await axios.get(url);
        return response.data.hits;
    } catch (error) {
        throw new Error('Помилка завантаження зображень');
    }
};
