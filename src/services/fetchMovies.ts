import { MovieResults } from '../types';
import { fetchData } from './fetchData';

export const fetchMovies = async (currentPage: number): Promise<any> => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=${currentPage}`;
  return await fetchData(url);
};
