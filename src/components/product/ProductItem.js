import $ from 'jquery';
import OrderForm from './OrderForm';
import waitForElement from '../../common/util';
import ProductVariantsForm from './ProductVariantsForm';
import OrderPreviewForm from './OrderPreviewForm';

class ProductItem {
  constructor({ selector }) {
    this.root = $(selector);

    this.productVariantsForm = new ProductVariantsForm({ selector: `${selector} .product-variants` });

    // handlers
    this.root.find('.sqs-add-to-cart-button').on('click', this.handleStartOrder);
  }

  handleStartOrder = () => {
    if (this.productVariantsForm.isFormValid()) {
      waitForElement('.sqs-async-form', () => {
        this.orderForm = new OrderForm({
          selector: '.sqs-async-form',
          showOrderPreviewForm: this.handleShowOrderPreviewForm,
        });

        $('.lightbox-close').on('click', this.handleLightBoxClose);
      });
    }
  }

  handleLightBoxClose = () => {
    this.orderForm.remove();
    this.orderPreviewForm.remove();

    delete this.orderForm;
    delete this.orderPreviewForm;
  }

  handleShowOrderForm = () => {
    this.orderForm.show();
    this.orderPreviewForm.hide();
  }

  handleShowOrderPreviewForm = () => {
    if (!this.orderPreviewForm) {
      this.orderPreviewForm = new OrderPreviewForm({
        productVariants: this.productVariantsForm.getProductVariants(),
        showOrderForm: this.handleShowOrderForm,
      });

      $('.lightbox-content').append(this.orderPreviewForm.getNode());
    } else {
      this.orderPreviewForm.setProps({
        productVariants: this.productVariantsForm.getProductVariants(),
      });
    }

    this.orderForm.hide();
    this.orderPreviewForm.show();
  }
}

export default (options) => new ProductItem(options);
