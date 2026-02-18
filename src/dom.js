export const renderTopMedias = (mediaType, data) => {
  const ul = document.querySelector(`#${mediaType.toLowerCase()}-list`);
  const topList = data.slice(0, 10);
  topList.forEach((media) => {
    const li = document.createElement('li');
    li.dataset.malId = data.mal_id;
    const img = document.createElement('img');
    img.src = media.images.webp.image_url;
    img.alt = `${media.title} image`;
    li.append(img);
    ul.append(li);
  });
};
