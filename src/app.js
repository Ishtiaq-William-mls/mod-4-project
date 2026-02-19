import {
  renderSearch,
  renderTopMedias,
  counter,
  renderModalContent,
} from './dom.js';
import { getSearch, getTopMedias, getById } from './api.js';

const form = document.getElementById('search-form');
const selector = document.querySelector('#sort-media');
const topMedia = document.querySelector('#top-media');
const mediaList = document.querySelector('#media-list');
const closeBtn = document.querySelector('#close-btn');
const modal = document.querySelector('#modal');
let mediaType = 'anime';
let searching;
let query;
let search;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  query = document.getElementById('query').value.trim();
  //   const mediaType = document.querySelector('input[name="media"]:checked').value;
  const search = await getSearch(`${mediaType}?q=${query}`);
  if (search.error) {
    console.warn(search.error.message);
    return;
  } else if (search.data.length - counter === 0) {
    topMedia.textContent = `No Search Results (${search.data.length}) for ${query}`;
  }
  searching = true;
  renderSearch(search.data);
  topMedia.textContent = `Top (${mediaType}) Search Results (${search.data.length - counter}) for ${query}`;
});

const loadTopMedias = async () => {
  searching = false;
  const response = await getTopMedias(mediaType);

  if (response.error) {
    console.warn(response.error.message);
    return;
  }

  renderTopMedias(response.data);
};

loadTopMedias();

selector.addEventListener('change', async (event) => {
  mediaType = event.target.value;

  console.log(mediaType);
  //   getTopMedias(mediaType).then((response) => {
  //     if (response.error) {
  //       console.warn(response.error.message);
  //       return;
  //     }
  //     mediaType =
  //       mediaType[0].toUpperCase() + mediaType.slice(1, mediaType.length);
  //     if (searching) {
  //       search = await getSearch(`${mediaType}?q=${query}`)
  //       renderSearch(search.data);
  //       return;
  //     }
  //     renderTopMedias(response.data);
  //     topMedia.textContent = `Top ${mediaType}`;
  //   });
  const response = await getTopMedias(mediaType);
  if (response.error) {
    console.warn(response.error.message);
    return;
  }
  if (searching) {
    search = await getSearch(`${mediaType}?q=${query}`);
    renderSearch(search.data);
    topMedia.textContent = `Top (${mediaType}) Search Results (${search.data.length - counter}) for ${query}`;
    return;
  }
  let displayName =
    mediaType[0].toUpperCase() + mediaType.slice(1, mediaType.length);
  renderTopMedias(response.data);
  topMedia.textContent = `Top ${displayName}`;
});

mediaList.addEventListener('click', async (event) => {
  const mediaCards = mediaList.querySelectorAll('.anime-card');
  mediaCards.forEach((media) => media.classList.remove('selected'));
  const clickedLi = event.target.closest('li');
  if (!clickedLi) {
    return;
  }
  clickedLi.classList.add('selected');
  const id = clickedLi.dataset.malId;
  const input = `${mediaType}/${id}`;
  const response = await getById(input);
  if (response.error) {
    console.warn(response.error.message);
    return;
  }
  renderModalContent(response.data);
  modal.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  mediaCards.forEach((media) => media.classList.remove('selected'));
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});
