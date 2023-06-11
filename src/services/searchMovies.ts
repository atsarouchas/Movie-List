import { SearchMovieResults } from '../types';
import { fetchData } from './fetchData';

export const searchMovies = async (
  query: string,
  pageNumber: number
): Promise<any> => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&query=${query}&page=${pageNumber}&include_adult=false`;
  return await fetchData(url);
};
