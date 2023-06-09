export interface SearchMovieResults {
  page: number;
  results: Record<string, unknown>[];
  total_pages: number;
  total_results: number;
}

export interface MovieResults extends SearchMovieResults {
  dates: {
    maximum: Date;
    minimum: Date;
  };
}

export interface Movie {
  title: string;
  poster_path: string;
  id: number;
  overview: string;
  genre_ids: number[];
  vote_average: number;
  release_date: Date;
}
