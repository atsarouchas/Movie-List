import { hideEndOfResults, hideError } from '../../../libraries/dom/utils';
import {
  setError,
  setInitialNowPlayingMovies,
} from '../../../libraries/state/actions';
import { fetchMovies } from '../../../services/fetchMovies';

export const fetchNowPlayingInitial = () => {
  hideEndOfResults();
  hideError();
  fetchMovies(1)
    .then((data) => {
      setInitialNowPlayingMovies(data);
    })
    .catch((error) => {
      console.error(error);
      setError('Something went wrong while fetching the movies');
    });
};
