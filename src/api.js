const getMangaSearch = async (query) => {
    try {
        const data = await fetch(`https://api.jikan.moe/v4/manga?q=${query}`);
        if (!data.ok) {
            throw Error(`Fetch failed: ${response.status} ${response.statusText}`);
        }
        const response = await data.json()
        return {
            data: response.data,
            error: null
        }
    } catch (err) {
        console.warn(err);
        return {
            data: null,
            error: err
        }
    }
}

const getAnimeSearch = async (query) => {
    try {
        const data = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
        if (!data.ok) {
            throw Error(`Fetch failed: ${response.status} ${response.statusText}`);
        }
        const response = await data.json()
        return {
            data: response.data,
            error: null
        }
    } catch (err) {
        console.warn(err);
        return {
            data: null,
            error: err
        }
    }
}