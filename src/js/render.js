// import form from '../templates/gallery-images-form.hbs';
import refs from './refs';
const KEY = '20731826-485a6ef4f9f6fa0c1feddacae';

// const images = '';
const BASE_URL = 'https://pixabay.com/api';
const page = 1;

// function fetchImages() {}

refs.searchForm.addEventListener('submit', onSearchImages);

function onSearchImages(e) {
  e.preventDefault();
  const serchQuery = e.currentTarget.elements.query.value;

  console.log(serchQuery);

  const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${serchQuery}&page=${page}&per_page=12&key=${KEY}`;
  fetch();
}
