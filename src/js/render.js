import API from '../service/fetch';
import refs from './refs';
import imagesTpl from '../templates/gallery-card.hbs';

// console.log(imagesTpl);

let serchQuery = '';
let page = 1;

refs.searchForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  serchQuery = e.currentTarget.elements.query.value;

  onSearchImages();
}

function onSearchImages() {
  //   page += 1;
  API.fetchImages(serchQuery, page)
    .then(data => {
      refs.gallery.innerHTML = '';
      renderImages(data);
    })
    .catch(error => console.log(error.message));
}

function renderImages(page) {
  refs.gallery.insertAdjacentHTML('beforeEnd', imagesTpl(page));
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
