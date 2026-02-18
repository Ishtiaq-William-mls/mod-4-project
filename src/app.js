import { renderSearch } from "./dom";
import { getSearch} from "./api";

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
});


