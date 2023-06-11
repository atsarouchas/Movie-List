import { fetchData } from './fetchData';

export const fetchMovieDetails = async (movieId: number): Promise<any> => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&append_to_response=videos,reviews,similar`;
  return await fetchData(url);
};
