import API from '../service/fetch';
import refs from './refs';
// import observer from './observer-gallery';

import imagesTpl from '../templates/gallery-card.hbs';
import onClickImage from './modal';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core/dist/PNotify.js';

function renderImages(page) {
  refs.gallery.insertAdjacentHTML('beforeEnd', imagesTpl(page));
}

let serchQuery = '';
let page = 1;

refs.searchForm.addEventListener('submit', onSubmit);
refs.gallery.addEventListener('click', onClickImage);

function onSubmit(e) {
  e.preventDefault();
  clearGallery();
  serchQuery = e.currentTarget.elements.query.value;
  //   emptyQuery(serchQuery);
  if (serchQuery === '' || serchQuery === ' ') {
    return error({ text: 'Please enter a value to search' });
  }
  onSearchImages();
}
// function emptyQuery(value) {
//   if (value === '' || value === ' ') {
//     return error({ text: 'Please enter a value to search' });
//   }
// }

function onSearchImages() {
  API.fetchImages(serchQuery, page).then(data => {
    clearGallery();
    renderImages(data);
    invalidQuery(data.hits);
  });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function invalidQuery(arr) {
  if (arr.length < 1) {
    return error({ text: 'Sorry for your request no matches' });
  }
}

const options = {
  rootMargin: '50px',
  threshold: 0.5,
};

const onEntry = entries => {
  entries.forEach(entry => {
    // тут можно писать логику для проверки вхождения
    if (!entry.isIntersecting || serchQuery === '') {
      return;
    }

    API.fetchImages(serchQuery, page).then(data => {
      page += 1;
      renderImages(data);
    });
  });
};

const observer = new IntersectionObserver(onEntry, options);

observer.observe(refs.intObserver);
// export default serchQuery;
