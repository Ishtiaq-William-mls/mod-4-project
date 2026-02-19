import { renderSearch, renderTopMedias } from './dom.js';
import { getSearch, getTopMedias } from './api.js';

const form = document.getElementById('search-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = document.getElementById('query').value.trim();
  const mediaType = document.querySelector('input[name="media"]:checked').value;
  const search = await getSearch(`${mediaType}?q=${query}`);
  if (search.error) {
    console.warn(search.error.message);
    return;
  }
  renderSearch(search.data);
});

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

  console.log(mediaType);
  getTopMedias(mediaType).then((response) => {
    if (response.error) {
      console.warn(response.error.message);
      return;
    }
    mediaType =
      mediaType[0].toUpperCase() + mediaType.slice(1, mediaType.length);
    renderTopMedias(response.data);
    topMedia.textContent = `Top ${mediaType}`;
  });
});
