import { moveList } from './ui-components/movieList';
import { search } from './ui-components/search';
import { modal } from './ui-components/modal';

import '../styles/styles.scss';

function main() {
  moveList();
  search();
  modal();
}

main();
