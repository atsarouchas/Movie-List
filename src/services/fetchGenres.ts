import { hideLoading } from '../libraries/dom/utils';

export const fetchGenres = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`
    );
    const data = await response.json();

    return data;
  } finally {
    hideLoading();
  }
};
