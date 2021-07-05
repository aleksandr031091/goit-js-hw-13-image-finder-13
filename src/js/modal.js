import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function onClickImage(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const instance = basicLightbox.create(
    `<img src="${e.target.dataset.sourse}" alt="${e.target.alt}" width="800" height="600">`,
  );

  instance.show();
}

export default onClickImage;
