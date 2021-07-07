import API from '../service/fetch';
import refs from './refs';
import onClickImage from './modal';

import imagesTpl from '../templates/gallery-card.hbs';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core/dist/PNotify.js';

function renderImages(page) {
  refs.gallery.insertAdjacentHTML('beforeEnd', imagesTpl(page));
}

let serchQuery = '';
let page = 1;
let lastPage = null;

refs.searchForm.addEventListener('submit', onSubmit);
refs.gallery.addEventListener('click', onClickImage);

function onSubmit(e) {
  e.preventDefault();
  serchQuery = e.currentTarget.elements.query.value.trim();
  page = 1;
  clearGallery();
  onSearchImages();
}

function onSearchImages() {
  API.fetchImages(serchQuery, page).then(data => {
    renderImages(data);
    invalidsearchQuery(data.hits);
    lastPage = Math.ceil(data.totalHits / 12);
  });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function invalidsearchQuery(arr) {
  if (!arr.length && page === 1) {
    return error({ text: 'Sorry for your request no matches' });
  }
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || serchQuery === '') {
      return;
    }

    page += 1;

    onSearchImages();
  });

  if (page === lastPage) {
    observer.disconnect();
  }
};

const observer = new IntersectionObserver(onEntry);

observer.observe(refs.intObserver);
