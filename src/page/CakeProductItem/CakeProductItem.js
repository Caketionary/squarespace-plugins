import $ from 'jquery';
import BaseComponent from '../../components/common/BaseComponent';
import OrderForm from '../../components/CakeProductItem/OrderForm';
import ProductVariantsForm from '../../components/CakeProductItem/ProductVariantsForm';
import OrderPreviewForm from '../../components/CakeProductItem/OrderPreviewForm';
import Order from '../../models/Order';
import ContactDetails from '../../models/ContactDetails';
import waitForElement from '../../lib/util';
import { parsePriceLabel } from '../../lib/currency';

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
    setTimeout(() => {
      this.orderPreviewForm.remove();
      delete this.orderPreviewForm;
    }, 0);

    this.root.find('.lightbox-inner').scrollTop(0);
  }

  handleShowOrderPreviewForm = () => {
    this.setState({ order: this.getOrder() });

    this.orderPreviewForm = new OrderPreviewForm({
      onBackButtonClick: this.handleShowOrderForm,
      onOrderButtonClick: this.handleOrderSubmit,
      order: this.state.order,
    });
    this.root.find('.lightbox-content').append(this.orderPreviewForm.getNode());

    this.orderForm.hide();

    this.root.find('.lightbox-inner').scrollTop(0);
  }

  handleOrderSubmit = ({ isMarketingAccepted }) => {
    const { order } = this.state;
    order.isMarketingAccepted = isMarketingAccepted;

    this.setState({ order });

    // do api call here

    // if success
    this.handleOrderSuccess();

    // if failure
  }

  handleOrderSuccess = () => {
    console.log('Success!');

    console.log(this.state.order);
  }

  handleOrderFailure = () => {
  }
}

export default CakeProductItem;
