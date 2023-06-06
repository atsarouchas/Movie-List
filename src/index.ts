import { moveList } from './ui-components/movie-list/movieList';
import { search } from './ui-components/search';
import { modal } from './ui-components/modal';

import '../styles/styles.scss';
import { error } from './ui-components/error';

function main() {
  moveList();
  search();
  modal();
  error();
}

main();
