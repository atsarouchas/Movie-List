import { Movie, MovieResults, SearchMovieResults } from '../../types';
import { state } from './AppState';

export const setInitialNowPlayingMovies = (data: MovieResults) => {
  const initialState = state.getState();
  state.setState({
    ...initialState,
    moviesInView: data.results,
    query: null,
    cachedPages: {
      [data.page]: [...data.results],
    },
    pagesInView: [1],
    totalPages: data.total_pages,
  });
};

export const setMovies = (data: MovieResults) => {
  const currentState = state.getState();
  state.setState({
    ...currentState,
    moviesInView: [...data.results],
    cachedPages: {
      ...currentState.cachedPages,
      [data.page]: [...data.results],
    },
    pagesInView: [...currentState.pagesInView, data.page],
    currentPage: data.page,
    totalPages: data.total_pages,
  });
};

export const setError = (errorText: string) => {
  const currentState = state.getState();
  state.setState({
    ...currentState,
    moviesInView: [],
    error: errorText,
  });
};

export const toggleModal = (item: Movie | null) => {
  const currentState = state.getState();
  state.setState({
    ...currentState,
    modalOpen: item?.id,
    modalData: {
      title: item?.title,
    },
  });
};

export const setSearchMovies = (data: SearchMovieResults, query: string) => {
  const currentState = state.getState();

  state.setState({
    ...currentState,
    moviesInView: [...data.results],
    query,
    cachedPages: {
      [data.page]: [...data.results],
    },
    pagesInView: [data.page],
    currentPage: data.page,
    totalPages: data.total_pages,
  });
};

export const setGenres = (data: { genres: { id: number; name: string }[] }) => {
  const currentState = state.getState();

  state.setState({
    ...currentState,
    genres: data.genres,
  });
};
