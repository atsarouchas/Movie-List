import { state } from '../libraries/state/AppState';

export const fetchMovies = async (currentPage: number) => {
  document
    .getElementById('loading-container')
    ?.classList.remove('display-none');
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=${currentPage}`
    );
    const data = await response.json();

    return data;
  } catch (err) {
    const currentState = state.getState();
    state.setState({
      ...currentState,
      error: 'Something went wrong with the movies',
    });
    return { results: [] };
  } finally {
    document.getElementById('loading-container')?.classList.add('display-none');
  }
};
