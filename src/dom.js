const searchList = document.querySelector('#search-list');

export const renderSearch = (results) => {
    searchList.innerHTML = '';
    results.forEach((r) => {
        const li = document.createElement('li');

        const img = document.createElement('img');
        img.src = r.images.webp.image_url;
        img.alt = r.title;

        const h3 = document.createElement('h3');
        h3.textContent = r.title;

        const info = document.createElement('p');
        info.textContent = `${r.synopsis}`;

        li.append(img, h3, info);
        searchList.append(li);
    })
}
export const renderTopMedias = (data) => {
  const ul = document.querySelector(`#media-list`);
  ul.innerHTML = '';
  const topList = data.slice(0, 10);
  topList.forEach((media) => {
    const li = document.createElement('li');
    li.dataset.malId = media.mal_id;
    const img = document.createElement('img');
    img.src = media.images.webp.image_url;
    img.alt = `${media.title} image`;
    li.append(img);
    ul.append(li);
  });
};

const rand = document.querySelector('#random-media')

export const renderRandom = (data) => {
    rand.innerHTML = '';
        const img = document.createElement('img');
        img.src = data.images.webp.image_url;
        img.alt = data.title;

        const h3 = document.createElement('h3');
        h3.textContent = data.title;

        const info = document.createElement('p');
        info.textContent = `${data.synopsis}`;

        rand.append(img, h3, info);
}
