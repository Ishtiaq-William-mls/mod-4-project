export const getSearch = async (query) => {
  try {
    const data = await fetch(`https://api.jikan.moe/v4/${query}`);
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
    const response = await fetch(
      `https://api.jikan.moe/v4/random/${mediaType}`,
    );
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
