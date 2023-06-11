import { fetchData } from './fetchData';

export const fetchGenres = async (): Promise<any> => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US`;
  return await fetchData(url);
};
