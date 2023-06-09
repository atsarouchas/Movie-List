import { AppState } from '../AppState';

describe('AppState', () => {
  let appState: AppState;
  let mockListener: jest.Mock;
  let mockListener_2: jest.Mock;

  beforeEach(() => {
    const initialState = { data: 'initial state' };
    appState = new AppState(initialState);
    mockListener = jest.fn();
    mockListener_2 = jest.fn();
  });

  test('getState should return the current state', () => {
    const currentState = appState.getState();
    expect(currentState).toEqual({ data: 'initial state' });
  });

  test('setState should update the state and notify listeners', () => {
    const newState = { data: 'new state' };

    appState.subscribe(mockListener);
    appState.setState(newState);

    expect(appState.getState()).toEqual(newState);
    expect(mockListener).toHaveBeenCalledTimes(1);
    expect(mockListener).toHaveBeenCalledWith(newState);
  });

  test('subscribe should add a listener to the listeners array', () => {
    appState.subscribe(mockListener);
    expect(appState['listeners']).toContain(mockListener);
  });

  test('notifyListeners should call all subscribed listeners with the current state', () => {
    appState.subscribe(mockListener);
    appState.subscribe(mockListener_2);

    appState.setState({ data: 'updated state' });

    expect(mockListener).toHaveBeenCalled();
    expect(mockListener_2).toHaveBeenCalled();
    expect(mockListener).toHaveBeenCalledWith({ data: 'updated state' });
    expect(mockListener_2).toHaveBeenCalledWith({ data: 'updated state' });
  });
});
