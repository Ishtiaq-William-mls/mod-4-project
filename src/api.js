// import { mediaType } from './app';
export const getSearch = async (query) => {
  try {
    const data = await fetch(
      `https://api.jikan.moe/v4/${query}&genres_exclude=12,49,9`,
    );
    if (!data.ok) {
      throw Error(`Fetch failed: ${data.status} ${data.statusText}`);
    }
    const response = await data.json();
    return {
      data: response.data,
      error: null,
    };
  } catch (err) {
    console.warn(err.message);
    return {
      data: null,
      error: err,
    };
  }
};

export const getTopMedias = async (mediaType) => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/top/${mediaType}`);
    if (!response.ok) {
      throw new Error(
        `Fetch failed: ${response.status} ${response.statusText}`,
      );
    }
    const animeData = await response.json();
    console.log(animeData.data);
    return { data: animeData.data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

export const getById = async (mediaId) => {
  try {
    const data = await fetch(`https://api.jikan.moe/v4/${mediaId}`);
    if (!data.ok) {
      throw Error(`Fetch failed: ${data.status} ${data.statusText}`);
    }
    const response = await data.json();
    return {
      data: response.data,
      error: null,
    };
  } catch (err) {
    console.warn(err.message);
    return {
      data: null,
      error: err,
    };
  }
};

export const getRandom = async (mediaType) => {
  try {
    const randomPage = Math.floor(Math.random() * 50) + 1;
    const response = await fetch(
      `https://api.jikan.moe/v4/${mediaType}?page=${randomPage}&order_by=popularity&sort=asc&genres_exclude=12,49,9`,
    );
    if (!response.ok) {
      throw new Error(
        `Fetch failed: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    const animeData = data.data[Math.floor(Math.random() * data.data.length)];
    console.log(data);
    console.log(animeData);
    return { data: animeData, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

export const getOngoing = async (mediaType) => {
  try {
    let response;
    const randomPage = Math.floor(Math.random() * 4) + 1;
    if (mediaType === 'manga') {
      response = await fetch(
        `https://api.jikan.moe/v4/manga?status=publishing&order_by=popularity&sort=asc&page=${randomPage}&genres_exclude=12,49,9`,
      );
    } else {
      response = await fetch(
        `https://api.jikan.moe/v4/anime?status=airing&order_by=popularity&sort=asc&page=${randomPage}&genres_exclude=12,49,9`,
      );
    }
    if (!response.ok) {
      throw new Error(
        `Fetch failed: ${response.status} ${response.statusText}`,
      );
    }
    const animeData = await response.json();
    return { data: animeData.data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

export const getGenres = async (genres) => {
  try {
    let response;
    const results = { data: [] };
    const randomPage = Math.floor(Math.random() * 15) + 1;
    response = await fetch(
      `https://api.jikan.moe/v4/${genres}&page=${randomPage}&genres_exclude=12,49,9`,
    );
    if (!response.ok) {
      throw new Error(
        `Fetch failed: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();
    results.data.push(...data.data);
    return { data: results.data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};
