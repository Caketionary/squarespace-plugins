import $ from 'jquery';
import BaseComponent from '../../components/common/BaseComponent';
import OrderForm from '../../components/CakeProductItem/OrderForm';
import ProductVariantsForm from '../../components/CakeProductItem/ProductVariantsForm';
import OrderPreviewForm from '../../components/CakeProductItem/OrderPreviewForm';
import waitForElement from '../../lib/util';
import { parsePriceLabel } from '../../lib/currency';
import Order from '../../models/Order';
import ContactDetails from '../../models/ContactDetails';

class CakeProductItem extends BaseComponent {
  constructor(props) {
    super(props, $(props.selector));

    this.productVariantsForm = new ProductVariantsForm({ selector: `${props.selector} .product-variants` });

    // handlers
    this.root.find('.sqs-add-to-cart-button').on('click', this.handleStartOrder);
  }

  getOrder = () => new Order(
    this.root.find('.ProductItem-details-title').text(),
    this.root.find('.product-quantity-input input').val(),
    parsePriceLabel(this.root.find('.product-price').text()),
    this.productVariantsForm.getProductVariants(),
    this.orderForm.getAdditionalItems(),
    new ContactDetails(
      this.orderForm.getName(),
      this.orderForm.getPhone(),
      this.orderForm.getPreferredIM(),
      this.orderForm.getIGAccount(),
    ),
    this.orderForm.getOrderDetails(),
  )

  handleStartOrder = () => {
    if (this.productVariantsForm.isFormValid()) {
      waitForElement('.sqs-async-form', () => {
        this.orderForm = new OrderForm({
          selector: '.sqs-async-form',
          showOrderPreviewForm: this.handleShowOrderPreviewForm,
        });

        this.root.find('.lightbox-close').on('click', this.handleLightBoxClose);
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

    this.root.find('.lightbox-inner').scrollTop(0);
  }

  handleShowOrderPreviewForm = () => {
    const order = this.getOrder();

    console.log(order);

    if (!this.orderPreviewForm) {
      this.orderPreviewForm = new OrderPreviewForm({
        showOrderForm: this.handleShowOrderForm,
        order,
      });

      this.root.find('.lightbox-content').append(this.orderPreviewForm.getNode());
    } else {
      this.orderPreviewForm.setProps({
        order,
      });
    }

    this.orderForm.hide();
    this.orderPreviewForm.show();

    this.root.find('.lightbox-inner').scrollTop(0);
  }
}

export default CakeProductItem;
