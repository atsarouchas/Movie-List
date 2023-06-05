import { hideLoading } from '../libraries/dom/utils';
import { state } from '../libraries/state/AppState';

export const searchMovies = async (query: string, pageNumber: number) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`
    );

    const data = await response.json();
    return data;
  } catch {
    const currentState = state.getState();
    state.setState({
      ...currentState,
      error: 'Something went wrong while fetching the movies',
    });
    return { results: [] };
  } finally {
    hideLoading();
  }
};
