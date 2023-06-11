import { hideError, showError } from '../libraries/dom/';
import { state } from '../libraries/state/';

export const error = () => {
  state.subscribe((newState) => {
    if (newState.error) {
      return showError(newState.error);
    }

    return hideError();
  });
};
