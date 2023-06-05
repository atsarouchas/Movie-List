import { state } from '../../../libraries/state/AppState';
import { fetchMovies } from '../../../services/fetchMovies';

export const initialFetch = async () => {
  const initialState = state.getState();
  const data = await fetchMovies(1);
  state.setState({
    ...initialState,
    moviesInView: data.results,
    query: null,
    cachedPages: {
      [data.page]: [...data.results],
    },
    pagesInView: [1],
  });
};
