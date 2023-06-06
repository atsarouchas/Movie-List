import { hideLoading } from '../libraries/dom/utils';

export const fetchMovies = async (currentPage: number) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=${currentPage}`
    );
    const data = await response.json();

    return data;
  } finally {
    hideLoading();
  }
};
