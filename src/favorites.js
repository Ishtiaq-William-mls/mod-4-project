import { getById } from './api.js';
import { getFavorites, getMediaType, saveFavorites } from './storage.js';
import { renderModalContent } from './dom.js';

const favorites = document.querySelector('#favorites');
const modal = document.querySelector('#modal');
const closeBtn = document.querySelector('#close-btn');
let mediaType = getMediaType();

const loadFavorites = async () => {
  const fav = getFavorites();
  favorites.innerHTML = '';
  for (const [id, card] of fav) {
    const li = document.createElement('li');
    li.dataset.malId = Number(id);
    li.classList.add('anime-card');
    const img = document.createElement('img');
    img.src = card.img;
    const hideOverflow = document.createElement('div');
    hideOverflow.classList.add('hide-overflow');
    const h3 = document.createElement('h3');
    h3.textContent = card.title;
    hideOverflow.append(h3);
    const favorite = document.createElement('i');
    favorite.classList.add('fa-heart', 'favorite-btn', 'fa-solid', 'hidden');

    li.append(img, hideOverflow, favorite);
    favorites.append(li);
    favorites.classList.add('loaded');
    setTimeout(() => {
      if (h3.scrollWidth > hideOverflow.clientWidth) {
        h3.classList.add('scrolling-title');
      }
    }, 0);
  }
};

favorites.classList.add('favorite-cards');

loadFavorites();

favorites.addEventListener('click', async (event) => {
  const clickedLi = event.target.closest('li');
  if (!clickedLi) return;
  document
    .querySelectorAll('.anime-card')
    .forEach((c) => c.classList.remove('selected'));
  clickedLi.classList.add('selected');
  const id = Number(clickedLi.dataset.malId);
  const fav = getFavorites();
  const card = fav.get(id);

  const response = await getById(`${card.type}/${id}`);
  if (response.error) {
    console.warn(response.error.message);
    return;
  }
  renderModalContent(response.data);
  modal.classList.remove('hidden');
  document.body.classList.add('no-scroll');
});

// closeBtn.addEventListener('click', () => {
//   const iframe = document.querySelector('iframe');
//   if (iframe) iframe.src = '';
//   modal.classList.add('hidden');
//   document.body.classList.remove('no-scroll');
//   document
//     .querySelectorAll('.anime-card')
//     .forEach((c) => c.classList.remove('selected'));
// });

// modal.addEventListener('click', (e) => {
//   if (e.target === modal) {
//     const iframe = document.querySelector('iframe');
//     if (iframe) iframe.src = '';
//     modal.classList.add('hidden');
//     document.body.classList.remove('no-scroll');
//     document
//       .querySelectorAll('.anime-card')
//       .forEach((c) => c.classList.remove('selected'));
//   }
// });

document.addEventListener('click', (event) => {
  if (!event.target.closest('.favorite-btn')) return;

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
    .forEach((fav) => {
      fav.classList.toggle('fa-solid', favorites.has(id));
      fav.classList.toggle('fa-regular', !favorites.has(id));
    });

  loadFavorites();
});

document
  .getElementById('scroll-top-btn')
  .addEventListener('click', async () => {
    document.getElementById('scroll-top-btn').classList.add('clicked');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    document.getElementById('scroll-top-btn').classList.remove('clicked');
  });
