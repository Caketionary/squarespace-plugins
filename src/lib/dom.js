import $ from 'jquery';

const swapElement = (a, b) => {
  // create a temporary marker div
  const aNext = $('<div>').insertAfter(a);
  a.insertAfter(b);
  b.insertBefore(aNext);
  // remove marker div
  aNext.remove();
};

export default swapElement;
