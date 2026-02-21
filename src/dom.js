const ul = document.querySelector(`#media-list`);
const modalContent = document.querySelector('.modal-content');
const renderedOngoing = new Set();
export let counter = 0;
import { getFavorites, saveFavorites } from './storage.js';

export const renderSearch = (results) => {
  //   searchList.innerHTML = '';
  ul.innerHTML = '';
  counter = 0;
  const favorites = getFavorites();
  results.forEach((r) => {
    // const genres = new Set(r.genres.map((genre) => genre.name));
    if (r.type === 'Music') {
      counter++;
      return;
    }
    const li = document.createElement('li');
    li.dataset.malId = r.mal_id;
    li.classList.add('anime-card');
    const hideOverflow = document.createElement('div');
    hideOverflow.classList.add('hide-overflow');
    const favorite = document.createElement('i');

    const isFav = favorites.has(r.mal_id);

    favorite.classList.add('fa-heart', 'favorite-btn');

    if (isFav) {
      favorite.classList.add('fa-solid');
    } else {
      favorite.classList.add('fa-regular');
    }
    const img = document.createElement('img');
    const title = document.createElement('h3');
    title.textContent = r.title_english ? r.title_english : r.title;
    img.src = r.images.webp.large_image_url;
    img.alt = r.title;

    hideOverflow.append(title);
    li.append(img, hideOverflow, favorite);
    // searchList.append(li);
    ul.append(li);
    if (title.scrollWidth > hideOverflow.clientWidth) {
      title.classList.add('scrolling-title');
    }
  });
};

export const renderTopMedias = (data) => {
  ul.innerHTML = '';
  const topList = data.slice(0, 10);
  const favorites = getFavorites();
  topList.forEach((media) => {
    const li = document.createElement('li');
    li.dataset.malId = media.mal_id;
    li.classList.add('anime-card');
    const hideOverflow = document.createElement('div');
    hideOverflow.classList.add('hide-overflow');
    const img = document.createElement('img');
    const title = document.createElement('h3');
    title.textContent = media.title_english ? media.title_english : media.title;
    const favorite = document.createElement('i');
    const isFav = favorites.has(media.mal_id);
    favorite.classList.add('fa-heart', 'favorite-btn');

    if (isFav) {
      favorite.classList.add('fa-solid');
    } else {
      favorite.classList.add('fa-regular');
    }
    img.classList.add('anime-images');
    img.src = media.images.webp.large_image_url;
    img.alt = `${media.title} image`;

    hideOverflow.append(title);
    li.append(img, hideOverflow, favorite);
    ul.append(li);
    if (title.scrollWidth > hideOverflow.clientWidth) {
      title.classList.add('scrolling-title');
    }
  });
};

export const renderModalContent = (data) => {
  const closeBtn = modalContent.querySelector('#close-btn');
  modalContent.innerHTML = '';
  modalContent.append(closeBtn);
  modalContent.dataset.malId = data.mal_id;
  const img = document.createElement('img');
  const favorites = getFavorites();
  const title = document.createElement('h3');
  const synopsis = document.createElement('p');
  const score = document.createElement('p');
  title.textContent = data.title_english ? data.title_english : data.title;
  img.classList.add('anime-images');
  img.src = data.images.webp.large_image_url;
  img.alt = `${data.title} image`;
  synopsis.textContent = data.synopsis ? data.synopsis : '';
  score.textContent = data.score;
  const favorite = document.createElement('i');
  const isFav = favorites.has(data.mal_id);

  favorite.classList.add('fa-heart', 'favorite-btn');

  if (isFav) {
    favorite.classList.add('fa-solid');
  } else {
    favorite.classList.add('fa-regular');
  }
  modalContent.append(img, title, synopsis, score, favorite);
};
const rand = document.querySelector('#random-media');

export const renderRandom = (data) => {
  rand.innerHTML = '';
  rand.classList.add('anime-card');

  rand.dataset.malId = data.mal_id;
  const hideOverflow = document.createElement('div');
  hideOverflow.classList.add('hide-overflow');
  const favorites = getFavorites();
  const img = document.createElement('img');
  img.src = data.images.webp.large_image_url;
  img.alt = data.title;

  const h3 = document.createElement('h3');
  h3.textContent = data.title_english ? data.title_english : data.title;
  const favorite = document.createElement('i');
  const isFav = favorites.has(data.mal_id);

  favorite.classList.add('fa-heart', 'favorite-btn');

  if (isFav) {
    favorite.classList.add('fa-solid');
  } else {
    favorite.classList.add('fa-regular');
  }

  const info = document.createElement('p');
  hideOverflow.append(h3);
  rand.append(img, hideOverflow, info, favorite);
  if (title.scrollWidth > hideOverflow.clientWidth) {
    title.classList.add('scrolling-title');
  }
};

const list = document.querySelector('#ongoing-list');

export const renderOngoing = async (data) => {
  const favorites = getFavorites();
  list.innerHTML = '';
  const newData = data;
  newData.forEach((media) => {
    if (renderedOngoing.has(media.mal_id)) {
      return;
    }

    renderedOngoing.add(media.mal_id);
    const li = document.createElement('li');
    li.dataset.malId = media.mal_id;
    li.classList.add('anime-card');
    const hideOverflow = document.createElement('div');
    hideOverflow.classList.add('hide-overflow');
    const img = document.createElement('img');
    const title = document.createElement('h3');
    title.textContent = media.title_english ? media.title_english : media.title;
    img.classList.add('anime-images');
    const favorite = document.createElement('i');
    const isFav = favorites.has(media.mal_id);

    favorite.classList.add('fa-heart', 'favorite-btn');

    if (isFav) {
      favorite.classList.add('fa-solid');
    } else {
      favorite.classList.add('fa-regular');
    }
    img.src = media.images.webp.large_image_url;
    img.alt = `${media.title} image`;

    hideOverflow.append(title);

    li.append(img, hideOverflow, favorite);
    list.append(li);
    if (title.scrollWidth > hideOverflow.clientWidth) {
      title.classList.add('scrolling-title');
    }
  });
};
