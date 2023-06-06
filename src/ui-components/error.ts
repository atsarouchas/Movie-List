import { hideError, showError } from '../libraries/dom/utils';
import { state } from '../libraries/state/AppState';

export const error = () => {
  state.subscribe((newState) => {
    if (newState.error) {
      return showError(newState.error);
    }

    return hideError();
  });
};
