import $ from 'jquery';
import OrderForm from './OrderForm';
import waitForElement from '../../common/util';

class PreOrderButton {
  constructor({ selector }) {
    const root = $(selector);

    root.on('click', this.handleOnClick);
  }

    handleOnClick = () => {
      waitForElement('.sqs-async-form form', () => {
        console.log('wait done, create form');
        OrderForm({ selector: '.sqs-async-form form' });
      });
    }
}

export default (options) => new PreOrderButton(options);
