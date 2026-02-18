const searchList = document.querySelector('#search-list')


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