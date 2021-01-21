import $ from 'jquery';
import OrderForm from './OrderForm';
import waitForElement from '../../common/util';

const createForm = () => {
  console.log('wait done, create form');
  OrderForm({ selector: '.sqs-async-form form' });
};

const handleOnClick = () => {
  waitForElement('.sqs-async-form form', createForm);
};

function PreOrderButton({ selector }) {
  const root = $(selector);

  root.on('click', handleOnClick);
}

export default PreOrderButton;
