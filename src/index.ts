import { movieList, search, modal, error, scrollToTop } from './ui-components';
import '../styles/main.scss';

function main() {
  movieList();
  search();
  modal();
  error();
  scrollToTop();
}

main();
