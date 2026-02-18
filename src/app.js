import { getTopMedias } from './api.js';
import { renderTopMedias } from './dom.js';

const selector = document.querySelector('#sort-media');
const topMedia = document.querySelector('#top-media');
let mediaType;

getTopMedias('anime').then((response) => {
  if (response.error) {
    console.warn(response.error.message);
    return;
  }
  renderTopMedias(response.data);
});

selector.addEventListener('change', (event) => {
  mediaType = event.target.value;
  getTopMedias(mediaType).then((response) => {
    if (response.error) {
      console.warn(response.error.message);
      return;
    }
    renderTopMedias(response.data);
    topMedia.textContent = `Top ${mediaType}`;
  });
});
