const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "35407219-577c8b768fffcc3735eef5754";
const PARAMS = "per_page=12&image_type=photo&orientation=horizontal&safesearch=true";

async function fetchImages(query, page = 1) {
  return await fetch(`${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&${PARAMS}`).then(
    (response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error(`Something go wrong`));
    }
  );
}

const api = {
  fetchImages,
}

export default api;