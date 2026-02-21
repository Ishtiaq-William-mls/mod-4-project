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
  const existingIframe = modalContent.querySelector('iframe');
  if (existingIframe) existingIframe.src = '';
  modalContent.innerHTML = '';
  modalContent.append(closeBtn);
  modalContent.dataset.malId = data.mal_id;

  const topSection = document.createElement('div');
  topSection.classList.add('modal-top');

  const img = document.createElement('img');
  img.classList.add('modal-img');
  img.src = data.images.webp.large_image_url;
  img.alt = `${data.title} image`;

  const info = document.createElement('div');
  info.classList.add('modal-info');

  const title = document.createElement('h3');
  title.textContent = data.title_english ? data.title_english : data.title;

  const score = document.createElement('p');
  score.textContent = `Rating: ${data.score ?? 'N/A'}     Rank: #${data.rank ?? 'N/A'}`;

  const status = document.createElement('p');
  status.textContent = `Status: ${data.status ?? 'N/A'}`;

  const published = document.createElement('p');
  let publish = "Aired";
  if (data.published) {
    publish = 'Published';
  }
  published.textContent = `${publish}: ${data.published?.string ?? data.aired?.string ?? 'N/A'}`;

  const genres = document.createElement('p');
  genres.textContent = `Genres: ${data.genres?.map(g => g.name).join(', ') || 'N/A'}`;

  const favorite = document.createElement('i');
  const favorites = getFavorites();
  const isFav = favorites.has(data.mal_id);
  favorite.classList.add('fa-heart', 'favorite-btn', isFav ? 'fa-solid' : 'fa-regular');

  const videoWrapper = document.createElement('div');
  videoWrapper.classList.add('modal-video');
  if (data.trailer?.embed_url) {
    const iframe = document.createElement('iframe');
    iframe.src = data.trailer.embed_url;
    iframe.allowFullscreen = true;
    videoWrapper.append(iframe);
  }

  info.append(title, score, status, published, genres, favorite);
  topSection.append(img, info, videoWrapper);

  const synopsis = document.createElement('p');
  synopsis.classList.add('synopsis');
  synopsis.textContent = data.synopsis ?? '';

  closeBtn.addEventListener('click', () => {
    const iframe = modalContent.querySelector('iframe');
    if (iframe) iframe.src = '';
    modal.classList.add('hidden');
  });

  modalContent.append(topSection, synopsis);
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
  if (h3.scrollWidth > hideOverflow.clientWidth) {
    h3.classList.add('scrolling-title');
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
