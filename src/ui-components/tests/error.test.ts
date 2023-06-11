const hideErrorMock = jest.fn();
const showErrorMock = jest.fn();

jest.mock('../../libraries/dom', () => ({
  hideError: hideErrorMock,
  showError: showErrorMock,
}));

import { error } from '../error';
import { setError } from '../../libraries/state';

describe('error', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call showError when a new error has been set to state', () => {
    error();

    setError('New Error');

    expect(showErrorMock).toHaveBeenCalledWith('New Error');
  });

  it('should call hideError when there is no error to state', () => {
    error();

    setError('');

    expect(hideErrorMock).toHaveBeenCalled();
  });
});
