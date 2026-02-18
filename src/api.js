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
