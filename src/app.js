import {
  renderRandom,
  renderSearch,
  renderTopMedias,
  counter,
  renderModalContent,
  renderOngoing,
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
const bottomMedia = document.querySelector('#bottom-media');
const closeBtn = document.querySelector('#close-btn');
const modal = document.querySelector('#modal');
let mediaType = getMediaType();
let displayName =
  mediaType[0].toUpperCase() + mediaType.slice(1, mediaType.length) + 's';
topMedia.textContent = `Top ${displayName}`;
bottomMedia.textContent = `Ongoing ${displayName}`;
selector.value = mediaType;
let searching;
let query;

const search = async () => {
  //   const mediaType = document.querySelector('input[name="media"]:checked').value;
  const search = await getSearch(`${mediaType}?q=${query}`);
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
  saveMediaType(mediaType);
  rand.innerHTML = '';
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
  const response2 = await getOngoing(mediaType);
  displayName =
    mediaType[0].toUpperCase() + mediaType.slice(1, mediaType.length) + 's';

  if (searching) {
    await search();
    renderOngoing(response2.data);
    bottomMedia.textContent = `Ongoing ${displayName}`;
    return;
  }
  const response = await getTopMedias(mediaType);
  if (response.error || response2.error) {
    response.error ? console.warn(response.error.message) : 0;
    response2.error ? console.warn(response2.error.message) : 0;
    return;
  }

  renderTopMedias(response.data);
  renderOngoing(response2.data);
  topMedia.textContent = `Top ${displayName}`;
  bottomMedia.textContent = `Ongoing ${displayName}`;
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

const mediaLists = document.querySelectorAll('.lists');

mediaLists.forEach((list) => {
  list.addEventListener('click', async (event) => {
    if (event.target.closest('.favorite-btn')) {
      return;
    }
    document
      .querySelectorAll('.anime-card')
      .forEach((c) => c.classList.remove('selected'));

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
    document.body.classList.add('no-scroll');
  });
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const randBtn = document.querySelector('#rand-btn');
let isLoadingRandom = false;

randBtn.addEventListener('click', async () => {
  if (isLoadingRandom) return;
  isLoadingRandom = true;

  console.log('clicked');
  randBtn.classList.add('no-click');
  randBtn.disabled = true;
  randBtn.textContent = 'Loading...';
  try {
    let random;
    // let genres;
    // let explicit = true;
    random = await getRandom(mediaType);
    if (random.error) {
      console.warn(random.error.message);
      return;
    }
    // while (explicit) {
    //   random = await getRandom();
    //   if (random.error) {
    //     console.warn(random.error.message);
    //     return;
    //   }
    //   genres = new Set(random.data.genres.map((genre) => genre.name));
    //   if (
    //     random.data.type !== 'Music'
    //   ) {
    //     explicit = false;
    //     await sleep(800 + Math.random() * 400);
    //   } else {
    //     console.log(genres);
    //     await sleep(800 + Math.random() * 400);
    //   }
    // }
    await sleep(800 + Math.random() * 400);
    renderRandom(random.data);
  } finally {
    randBtn.textContent = 'Get Random Anime/Manga';
    randBtn.disabled = false;
    randBtn.classList.remove('no-click');
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    isLoadingRandom = false;
  }
});

const loadOngoing = async () => {
  const response = await getOngoing(mediaType);

  if (response.error) {
    console.warn(response.error.message);
    return;
  }

  renderOngoing(response.data);
};

loadOngoing();

const rand = document.querySelector('#random-media');

rand.addEventListener('click', async (event) => {
  if (event.target.closest('.favorite-btn')) {
    return;
  }
  const id = rand.dataset.malId;
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

document.addEventListener('click', (event) => {
  if (event.target.closest('.favorite-btn')) {
    const heart = event.target.closest('.favorite-btn');

    let favorites = getFavorites();

    const container = heart.closest('[data-mal-id]');
    if (!container) return;

    const id = Number(container.dataset.malId);

    const card = {
      id,
      img: container.querySelector('img').src,
      title: container.querySelector('h3').textContent,
      type: mediaType,
    };

    if (favorites.has(id)) {
      favorites.delete(id);
    } else {
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
