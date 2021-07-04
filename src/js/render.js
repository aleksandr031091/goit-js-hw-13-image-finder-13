import API from '../service/fetch';
import refs from './refs';

import imagesTpl from '../templates/gallery-card.hbs';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core/dist/PNotify.js';

// console.log(imagesTpl);
function renderImages(page) {
  refs.gallery.insertAdjacentHTML('beforeEnd', imagesTpl(page));
}

let serchQuery = '';
let page = 1;

refs.searchForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  clearGallery();
  serchQuery = e.currentTarget.elements.query.value;

  if (serchQuery === '' || serchQuery === ' ') {
    return error({ text: 'Please enter a value to search' });
  }
  onSearchImages();
}

function onSearchImages() {
  API.fetchImages(serchQuery, page).then(data => {
    clearGallery();
    renderImages(data);
    invalidQuery(data.hits);
    // if (data.hits < 1) {
    //   return error({ text: 'Sorry for your request no matches' });
    // }
  });
  // .catch(err => error({ text: err.message }));
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
    // console.log(serchQuery);
    API.fetchImages(serchQuery, page).then(data => {
      //   console.log(serchQuery);
      //   console.log(data);

      page += 1;
      renderImages(data);
      //   console.log(data.hits);
    });
    // console.log(entry);
  });
};

const observer = new IntersectionObserver(onEntry, options);

observer.observe(refs.intObserver);
