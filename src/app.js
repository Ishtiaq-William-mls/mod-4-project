import { renderRandom, renderSearch, renderTopMedias } from "./dom.js";
import { getSearch, getTopMedias, getRandom } from "./api.js";

const form = document.getElementById("search-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = document.getElementById('query').value.trim();
    const mediaType = document.querySelector('input[name="media"]:checked').value;
    const search = await getSearch(`${mediaType}?q=${query}`)
    if(search.error){
        console.warn(search.error.message);
        return;
    }
    renderSearch(search.data);
    form.reset();
});

const selector = document.querySelector('#sort-media');
const topMedia = document.querySelector('#top-media');
let mediaType;

getTopMedias('anime').then((response) => {
  if (response.error) {
    console.warn(response.error.message);
    return;
  }
  renderTopMedias(response.data);
});

selector.addEventListener('change', (event) => {
  mediaType = event.target.value;
  getTopMedias(mediaType).then((response) => {
    if (response.error) {
      console.warn(response.error.message);
      return;
    }
    renderTopMedias(response.data);
    topMedia.textContent = `Top ${mediaType}`;
  });
});


const randBtn = document.querySelector('#rand-btn');

randBtn.addEventListener('click', () => {
    getRandom('anime').then((response) => {
        if (response.error) {
            console.warn(response.error.message);
            return;
        }
        renderRandom(response.data);
    })
})
