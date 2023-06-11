import { hideEndOfResults, hideError } from '../../../libraries/dom/';
import {
  setError,
  setInitialNowPlayingMovies,
} from '../../../libraries/state/';
import { fetchMovies } from '../../../services/';

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
