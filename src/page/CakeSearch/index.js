import $ from 'jquery';

import getCakeSearch from './CakeSearchFactory';

$(() => {
  // id for cake collection
  if ($('body#collection-5ff35db1673a147fccfbc968')) {
    getCakeSearch();
  }
});
