import refs from './refs';

window.addEventListener('scroll', trackScroll);
refs.backToTop.addEventListener('click', backToTop);

function trackScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    refs.backToTop.classList.add('back_to_top-show');
  }
  if (scrolled < coords) {
    refs.backToTop.classList.remove('back_to_top-show');
  }
}

function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -100);
    setTimeout(backToTop, 10);
  }
}
