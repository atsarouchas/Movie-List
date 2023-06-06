import { hideEndOfResults } from '../../../libraries/dom/utils';
import { setInitialNowPlayingMovies } from '../../../libraries/state/actions';
import { fetchMovies } from '../../../services/fetchMovies';

export const initialFetch = async () => {
  hideEndOfResults();
  const data = await fetchMovies(1);
  setInitialNowPlayingMovies(data);
};
