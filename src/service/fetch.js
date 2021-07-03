const KEY = '20731826-485a6ef4f9f6fa0c1feddacae';
const BASE_URL = 'https://pixabay.com/api';
// let serchQuery = '';
let page = 1;

function fetchImages(serchQuery) {
  const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${serchQuery}&page=${page}&per_page=12&key=${KEY}`;

  return fetch(url).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('not found');
  });
}

export default { fetchImages };
