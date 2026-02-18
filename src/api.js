export const getTopAnime = async () => {
  try {
    const response = await fetch('https://api.jikan.moe/v4/top/anime');
    if (!response.ok) {
      throw new Error(
        `Fetch failed: ${response.status} ${response.statusText}`,
      );
    }
    const animeData = response.json();
    return { data: animeData.data, error: null };
  } catch (error) {
    console.warn(error.message);
    return { data: null, error: error };
  }
};

export const getTopManga = async () => {
  try {
    const response = await fetch('https://api.jikan.moe/v4/top/manga');
    if (!response.ok) {
      throw new Error(
        `Fetch failed: ${response.status} ${response.statusText}`,
      );
    }
    const mangaData = response.json();
    return { data: mangaData.data, error: null };
  } catch (error) {
    console.warn(error.message);
    return { data: null, error: error };
  }
};
