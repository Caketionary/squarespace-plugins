import $ from 'jquery';

import getCakeProductItem from './CakeProductItemFactory';

$(() => {
  if ($('article.ProductItem')) {
    getCakeProductItem();
  }
});
