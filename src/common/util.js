import $ from 'jquery';

const waitForElement = (selector, callback) => {
  if ($(selector).length) {
    callback();
  } else {
    setTimeout(() => {
      waitForElement(selector, callback);
    }, 100);
  }
};

export default waitForElement;
