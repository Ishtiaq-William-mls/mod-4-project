import {
  renderRandom,
  renderSearch,
  renderTopMedias,
  counter,
  renderModalContent,
  renderOngoing,
  renderGenreRow,
  renderExplore,
} from './dom.js';
import {
  getSearch,
  getTopMedias,
  getById,
  getRandom,
  getOngoing,
} from './api.js';

import {
  getFavorites,
  saveFavorites,
  getMediaType,
  saveMediaType,
} from './storage.js';

const form = document.getElementById('search-form');
const selector = document.querySelector('#sort-media');
const topMedia = document.querySelector('#top-media');
// const mediaList = document.querySelector('.lists');
const bottomSection = document.querySelector('#bottom-section');
const bottomMedia = document.querySelector('#bottom-media');
const mediaList = document.querySelector('#media-list');
const closeBtn = document.querySelector('#close-btn');
const modal = document.querySelector('#modal');
const genreContainer = document.querySelector('#genres');
let mediaType = getMediaType();
// let displayName =
//   mediaType[0].toUpperCase() + mediaType.slice(1, mediaType.length) + 's';
// topMedia.textContent = `Top ${displayName}`;
// bottomMedia.textContent = `Ongoing ${displayName}`;
selector.value = mediaType;
let searching;
let query;

const search = async () => {
  //   const mediaType = document.querySelector('input[name="media"]:checked').value;
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
  //   if (mediaType === 'anime') {
  //     bottomSection
  //       .querySelectorAll('.child')
  //       .forEach((child) => child.classList.remove('hidden'));
  //   } else if (mediaType === 'manga') {
  //     bottomSection.querySelectorAll('.child').forEach((child) => {
  //       child.classList.add('hidden');
  //     });
  //   }
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

  if (searching) {
    await search();

    return;
  }
  loadExplore();
});

// mediaList.addEventListener('click', async (event) => {
//   const mediaCards = mediaList.querySelectorAll('.anime-card');
//   mediaCards.forEach((media) => media.classList.remove('selected'));
//   const clickedLi = event.target.closest('li');
//   if (!clickedLi) {
//     return;
//   }
//   clickedLi.classList.add('selected');
//   const id = clickedLi.dataset.malId;
//   const input = `${mediaType}/${id}`;
//   const response = await getById(input);
//   if (response.error) {
//     console.warn(response.error.message);
//     return;
//   }
//   renderModalContent(response.data);
//   modal.classList.remove('hidden');
// });

document.querySelector('main').addEventListener('click', async (event) => {
  const card = event.target.closest('.anime-card');
  if (!card) {
    return;
  }

  if (event.target.closest('.favorite-btn')) return;

  document
    .querySelectorAll('.anime-card')
    .forEach((c) => c.classList.remove('selected'));

  card.classList.add('selected');

  const id = card.dataset.malId;
  const input = `${mediaType}/${id}`;

  const response = await getById(input);

  if (response.error) {
    console.warn(response.error.message);
    return;
  }

  renderModalContent(response.data);
  modal.classList.remove('hidden');
  document.body.classList.add('no-scroll');
});

closeBtn.addEventListener('click', () => {
  // const mediaCards = mediaList.querySelectorAll('.anime-card');
  modal.classList.add('hidden');
  // mediaCards.forEach((media) => media.classList.remove('selected'));
  document.body.classList.remove('no-scroll');
  // mediaCards.forEach((media) => media.classList.remove('selected'));
  document
    .querySelectorAll('.anime-card')
    .forEach((c) => c.classList.remove('selected'));
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    // const mediaCards = mediaList.querySelectorAll('.anime-card');
    modal.classList.add('hidden');
    // mediaCards.forEach((media) => media.classList.remove('selected'));
    document.body.classList.remove('no-scroll');
    // mediaCards.forEach((media) => media.classList.remove('selected'))
    document
      .querySelectorAll('.anime-card')
      .forEach((c) => c.classList.remove('selected'));
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
        title: container.querySelector('h3').textContent,
        type: mediaType,
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

document.getElementById('scroll-top-btn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const loadExplore = async () => {
  topMedia.textContent = 'Loading...';
  await renderExplore(mediaType);
  topMedia.textContent = 'Explore More:';
};

loadExplore();
