type StateListener = (state: any) => void;

const initialState = {
  modalOpen: null,
  currentPage: 1,
  cachedPages: null,
  moviesInView: [],
  pagesInView: [],
  totalPages: null,
  query: null,
  error: null,
  genres: [],
};

export class AppState {
  private state: any;
  private listeners: StateListener[] = [];

  constructor(state: any) {
    this.state = state;
  }

  getState(): any {
    return this.state;
  }

  setState(newState: any): void {
    this.state = newState;
    this.notifyListeners();
  }

  subscribe(listener: StateListener): void {
    this.listeners.push(listener);
  }

  private notifyListeners() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}

export const state = new AppState(initialState);
