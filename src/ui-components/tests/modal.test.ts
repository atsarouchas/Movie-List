import { toggleModal } from '../../libraries/state';
import { Movie } from '../../types';

const fetchMovieDetailsMock = jest.fn();

jest.mock('../../services/fetchMovieDetails', () => ({
  fetchMovieDetails: fetchMovieDetailsMock,
}));

import { modal } from '../modal';

describe('modal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render modal', () => {
    modal();

    fetchMovieDetailsMock.mockResolvedValue({
      videos: {
        results: [{ type: 'Trailer', key: '/dsdsd' }],
      },
      reviews: {
        results: [
          {
            author: 'Tasos',
            content: 'Good movie',
            created_at: new Date('6-6-2002'),
          },
        ],
      },
      similar: {
        results: [
          {
            title: 'Similar Movie',
            release_date: new Date('2-2-2000'),
            vote_average: 8,
            poster_path: 'http://url.com',
          },
        ],
      },
    });

    toggleModal({ id: 150, title: 'newMovie' } as Movie);

    expect(fetchMovieDetailsMock).toHaveBeenCalled();
  });
});
