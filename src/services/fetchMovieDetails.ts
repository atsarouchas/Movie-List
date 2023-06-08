import { hideLoading } from '../libraries/dom/utils';

export const fetchMovieDetails = async (movieId: number) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&append_to_response=videos,reviews,similar`
    );
    const data = await response.json();

    return data;
  } finally {
    hideLoading();
  }
};
