export const getFavorites = () => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? new Map(JSON.parse(favorites)) : new Map();
};

export const saveFavorites = (favorites) => {
  localStorage.setItem('favorites', JSON.stringify([...favorites]));
};

export const getMediaType = () => {
  const mediaType = localStorage.getItem('mediaType');
  return mediaType ? JSON.parse(mediaType) : 'anime';
};

export const saveMediaType = (mediaType) => {
  localStorage.setItem('mediaType', JSON.stringify(mediaType));
};
