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
