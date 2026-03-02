import {
  renderSearch,
  counter,
  renderModalContent,
  renderExplore,
  closeModal,
} from './dom.js';

import { getSearch, getById } from './api.js';

import {
  getFavorites,
  saveFavorites,
  getMediaType,
  saveMediaType,
} from './storage.js';

const form = document.getElementById('search-form');
const selector = document.querySelector('#sort-media');
const topMedia = document.querySelector('#top-media');
const mediaList = document.querySelector('#media-list');
const modal = document.querySelector('#modal');
const genreContainer = document.querySelector('#genres');
const ul = document.querySelector('#media-list');
const modalContent = document.querySelector('.modal-content');
let mediaType = getMediaType();
selector.value = mediaType;
let searching;
let query;
let isLoadingExplore = false;
let isLoadingModal = false;

const search = async () => {
  ul.classList.remove('loaded');
  topMedia.textContent = `Searching...`;
  const search = await getSearch(`${mediaType}?q=${query}`);
  mediaList.classList.remove('hidden');
  genreContainer.classList.add('hidden');
  if (search.error) {
    console.warn(search.error.message);
    return;
  }
  renderSearch(search.data);
  if (search.data.length - counter === 0) {
    topMedia.textContent = `No Search Results (${search.data.length - counter}) for ${query}`;
  } else {
    topMedia.textContent = `Top (${mediaType}) Search Results (${search.data.length - counter}) for ${query}`;
  }
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  query = form.elements.query.value.trim();
  await search();
  searching = true;
  form.reset();
});

selector.addEventListener('change', async (event) => {
  mediaType = event.target.value;
  saveMediaType(mediaType);
  if (searching) {
    await search();

    return;
  }
  loadExplore();
});

document.addEventListener('click', async (event) => {
  if (!isLoadingExplore) {
    const card = event.target.closest('.anime-card');
    if (!card) return;

    if (event.target.closest('.favorite-btn')) return;

    if (isLoadingModal) return;
    isLoadingModal = true;

    try {
      document
        .querySelectorAll('.anime-card')
        .forEach((c) => c.classList.remove('selected'));

      card.classList.add('selected');

      const id = card.dataset.malId;
      const type = card.dataset.type;

      const response = await getById(`${type}/${id}`);
      if (response.error) {
        console.warn(response.error.message);
        return;
      }
      await renderModalContent(response.data, type);
      modal.classList.remove('hidden');
      document.body.classList.add('no-scroll');
    } finally {
      isLoadingModal = false;
    }
  }
});

document.addEventListener('click', (event) => {
  if (event.target.closest('.favorite-btn')) {
    const heart = event.target.closest('.favorite-btn');

    let favorites = getFavorites();

    const container = heart.closest('[data-mal-id]');
    if (!container) return;

    const id = Number(container.dataset.malId);

    if (favorites.has(id)) {
      favorites.delete(id);
    } else {
      const card = {
        id,
        img: container.querySelector('img').src,
        title: container.querySelector('.modal-top h3')
          ? container.querySelector('.modal-top h3').textContent
          : container.querySelector('h3').textContent,
        type: container.dataset.type,
      };

      favorites.set(id, card);
    }

    saveFavorites(favorites);

    document
      .querySelectorAll(`[data-mal-id='${id}'] .favorite-btn`)
      .forEach((favorite) => {
        if (favorites.has(id)) {
          favorite.classList.remove('fa-regular');
          favorite.classList.add('fa-solid');
        } else {
          favorite.classList.remove('fa-solid');
          favorite.classList.add('fa-regular');
        }
      });
  }
});

document
  .getElementById('scroll-top-btn')
  .addEventListener('click', async () => {
    document.getElementById('scroll-top-btn').classList.add('clicked');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    document.getElementById('scroll-top-btn').classList.remove('clicked');
  });

const loadExplore = async () => {
  isLoadingExplore = true;
  selector.disabled = true;
  topMedia.textContent = 'Loading...';
  await renderExplore(mediaType);
  topMedia.textContent = 'Explore';
  selector.disabled = false;
  isLoadingExplore = false;
};

loadExplore();

const closeBtn = document.querySelector('#close-btn');

closeBtn.addEventListener('click', () => {
  closeModal();
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});
