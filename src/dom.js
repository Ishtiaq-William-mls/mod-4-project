const ul = document.querySelector(`#media-list`);
const modalContent = document.querySelector('.modal-content');
export let counter = 0;

export const renderSearch = (results) => {
  //   searchList.innerHTML = '';
  ul.innerHTML = '';
  counter = 0;
  results.forEach((r) => {
    const genres = new Set(r.genres.map((genre) => genre.name));
    if (genres.has('Hentai') || genres.has('Erotica') || genres.has('Ecchi')) {
      counter++;
      return;
    }
    const li = document.createElement('li');
    li.dataset.malId = r.mal_id;
    li.classList.add('anime-card');
    const img = document.createElement('img');
    const title = document.createElement('h3');
    title.textContent = r.title_english ? r.title_english : r.title;
    img.src = r.images.webp.large_image_url;
    img.alt = r.title;

    li.append(img, title);
    // searchList.append(li);
    ul.append(li);
  });
};
export const renderTopMedias = (data) => {
  ul.innerHTML = '';
  const topList = data.slice(0, 10);
  topList.forEach((media) => {
    const li = document.createElement('li');
    li.dataset.malId = media.mal_id;
    li.classList.add('anime-card');
    const img = document.createElement('img');
    const title = document.createElement('h3');
    title.textContent = media.title_english ? media.title_english : media.title;
    img.classList.add('anime-images');
    img.src = media.images.webp.large_image_url;
    img.alt = `${media.title} image`;

    li.append(img, title);
    ul.append(li);
  });
};

export const renderModalContent = (data) => {
  const closeBtn = modalContent.querySelector('#close-btn');
  modalContent.innerHTML = '';
  modalContent.append(closeBtn);
  const img = document.createElement('img');
  const title = document.createElement('h3');
  const synopsis = document.createElement('p');
  const score = document.createElement('p');
  const favorites = document.createElement('p');
  title.textContent = data.title_english ? data.title_english : data.title;
  img.classList.add('anime-images');
  img.src = data.images.webp.large_image_url;
  img.alt = `${data.title} image`;
  title.textContent = data.title;
  synopsis.textContent = data.synopsis ? data.synopsis : '';
  score.textContent = data.score;
  favorites.textContent = data.favorites;
  modalContent.append(img, title, synopsis, score, favorites);
};
const rand = document.querySelector('#random-media');

export const renderRandom = (data) => {
  rand.innerHTML = '';

  rand.dataset.malId = data.mal_id;

  const img = document.createElement('img');
  img.src = data.images.webp.large_image_url;
  img.alt = data.title;

  const h3 = document.createElement('h3');
  h3.textContent = data.title_english ? data.title_english : data.title;

  const info = document.createElement('p');

  rand.append(img, h3, info);
};
