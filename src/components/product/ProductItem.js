import $ from 'jquery';
import OrderForm from './OrderForm';
import waitForElement from '../../common/util';
import ProductVariantsForm from './ProductVariantsForm';

class ProductItem {
  constructor({ selector }) {
    this.root = $(selector);
    this.productVariantsForm = new ProductVariantsForm({ selector: `${selector} .product-variants` });

    // handlers
    this.root.find('.sqs-add-to-cart-button').on('click', this.handleAddToCart);
  }

  handleAddToCart = () => {
    if (this.productVariantsForm.isFormValid()) {
      const productVariants = this.productVariantsForm.getProductVariants();

      waitForElement('.sqs-async-form', () => {
        OrderForm({ selector: '.sqs-async-form', productVariants });
      });
    }
  }
}

export default (options) => new ProductItem(options);
