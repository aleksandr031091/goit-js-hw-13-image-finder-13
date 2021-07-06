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

refs.searchForm.addEventListener('submit', onSubmit);
refs.gallery.addEventListener('click', onClickImage);

function onSubmit(e) {
  serchQuery = e.currentTarget.elements.query.value.trim();
  e.preventDefault();
  clearGallery();
  onSearchImages();
}

function onSearchImages() {
  API.fetchImages(serchQuery).then(data => {
    renderImages(data);
    invalidsearchQuery(data.hits);

    page += 1;
  });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function invalidsearchQuery(arr) {
  if (!arr.length) {
    return error({ text: 'Sorry for your request no matches' });
  }
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting || serchQuery === '') {
      return;
    }

    API.fetchImages(serchQuery, page).then(data => {
      renderImages(data);

      page += 1;
    });
  });
};

const observer = new IntersectionObserver(onEntry);

observer.observe(refs.intObserver);

//убрать ошибку при npm ci
