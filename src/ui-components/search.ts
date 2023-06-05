import { state } from '../libraries/state/AppState';

export function search(): void {
  const search = document.getElementById('search');

  search?.addEventListener('input', (e) => {
    console.log((<HTMLTextAreaElement>e?.target)?.value);
  });

  state.subscribe((newState) =>
    console.log('+++ New state from search:', newState)
  );
}
