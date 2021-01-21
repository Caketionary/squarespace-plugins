// hijack the Add to Cart button in order form
import $ from 'jquery';

const handleFormSubmit = (e) => {
  e.preventDefault();

  alert('submit');
};

function OrderForm({ selector }) {
  const root = $(selector);

  root.find('input[type=submit').on('click', handleFormSubmit);
}

export default OrderForm;
