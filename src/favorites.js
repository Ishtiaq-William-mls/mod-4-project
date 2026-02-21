import { getById } from "./api.js";
import { getFavorites, getMediaType } from "./storage.js";
import { renderModalContent } from "./dom.js";

const favorites = document.querySelector('#favorites');
const modal = document.querySelector('#modal');
const closeBtn = document.querySelector('#close-btn');
let mediaType = getMediaType();

const loadFavorites = async () => {
  const fav = getFavorites();
  for (const f of fav) {
    const input = `${mediaType}/${f}`;
    const response = await getById(input);
    if (response.error) {
      console.warn(response.error.message);
      return;
    }
    const li = document.createElement('li');
    li.dataset.malId = response.data.mal_id;
    li.classList.add('anime-card');
    const img = document.createElement('img');
    img.src = response.data.images.webp.large_image_url;
    img.alt = response.data.title;
    const h3 = document.createElement('h3');
    h3.textContent = response.data.title_english;
    li.append(img, h3);
    favorites.append(li);
  }
}

loadFavorites();

favorites.addEventListener('click', async (event) => {
  const clickedLi = event.target.closest('li');
  if (!clickedLi) return;
  const id = clickedLi.dataset.malId;
  const response = await getById(`${mediaType}/${id}`);
  if (response.error) {
    console.warn(response.error.message);
    return;
  }
  renderModalContent(response.data);
  modal.classList.remove('hidden');
  document.body.classList.add('no-scroll');
});

closeBtn.addEventListener('click', () => {
  const iframe = document.querySelector('iframe');
  if (iframe) iframe.src = '';
  modal.classList.add('hidden');
  document.body.classList.remove('no-scroll');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    const iframe = document.querySelector('iframe');
    if (iframe) iframe.src = '';
    modal.classList.add('hidden');
    document.body.classList.remove('no-scroll');
  }
});