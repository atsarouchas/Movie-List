import { moveList } from './ui-components/movie-list/movieList';
import { search } from './ui-components/search';
import { modal } from './ui-components/modal';
import { error } from './ui-components/error';
import { scrollToTop } from './ui-components/scrollToTop';

import '../styles/styles.scss';

function main() {
  moveList();
  search();
  modal();
  error();
  scrollToTop();
}

main();
