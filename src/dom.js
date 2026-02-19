const searchList = document.querySelector('#search-list');
const ul = document.querySelector(`#media-list`);
export let counter;

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
