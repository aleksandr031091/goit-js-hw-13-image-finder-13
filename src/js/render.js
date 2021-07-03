import API from '../service/fetch';
import refs from './refs';
import imagesTpl from '../templates/gallery-card.hbs';

// console.log(imagesTpl);

refs.searchForm.addEventListener('submit', onSearchImages);

function onSearchImages(e) {
  e.preventDefault();
  const serchQuery = e.currentTarget.elements.query.value;

  //   console.log(serchQuery);
  API.fetchImages(serchQuery)
    .then(renderImages)
    .catch(error => console.log(error.message));
}

function renderImages(images) {
  refs.gallery.insertAdjacentHTML('beforeEnd', imagesTpl(images));
}
