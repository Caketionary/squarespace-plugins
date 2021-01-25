import $ from 'jquery';
import BaseComponent from '../common/BaseComponent';
import { getPriceLabel } from '../../lib/currency';

class OrderPreviewForm extends BaseComponent {
  constructor(props) {
    super(props, $('<div class="sqs-widget sqs-async-form"/>'));

    this.root.find('.back-button').on('click', this.handleGoBack);
  }

  handleGoBack = (e) => {
    e.preventDefault();

    this.props.showOrderForm();
  }

  render() {
    const {
      order,
    } = this.props;

    const {
      productName, quantity, unitPrice, additionalItems, contactDetails, orderDetails,
    } = order;

    this.root.empty();

    this.root.append(`
      <div class="sqs-async-form-content">
        <div class="form-wrapper">
          <div class="form-title">確認訂單資料</div>
          <div class="form-inner-wrapper">
            <form>
              <div class="field-list clear">
                <h4>產品資料</h4>
                <div class="form-item field">
                  <label class="title">產品詳情</label>
                  <div>${productName} (${order.getProductVariantsDesc()}) x ${quantity}</div>
                </div>
                <div class="form-item field">
                  <label class="title">附加項目</label>
                  <div>${additionalItems}</div>
                </div>
                <div class="form-item field">
                  <label class="title">總數</label>
                  <div>${getPriceLabel(unitPrice)} x ${quantity} = ${getPriceLabel(order.getTotalAmount())}</div>
                </div>
                <h4>聯絡方法/h4>
                <div class="form-item field">
                  <label class="title">名字</label>
                  <div>${contactDetails.name}</div>
                </div>
                <div class="form-item field">
                  <label class="title">電話號碼</label>
                  <div>${contactDetails.phone}</div>
                </div>
                <div class="form-item field">
                  <label class="title">首選聯繫方式</label>
                  <div>${contactDetails.preferredIM}</div>
                </div>
                <div class="form-item field">
                  <label class="title">IG帳戶</label>
                  <div>${contactDetails.igAccount}</div>
                </div>
                <h4>訂購詳情</h4>
                ${orderDetails.map(({ label, value }) => `
                <div class="form-item field">
                <label class="title">${label}</label>
                <div>${value}</div>
              </div>
                `).join('')}
                <div class="form-item field">
                  <legend class="title">條款及細則，以及私隱政策聲明 *</legend>
                  <div class="option">
                    <label>
                      <input name="accept-terms" type="checkbox"></input>
                      我已閱讀，理解及同意有關條款及細則，以及私隱政策聲明。
                    </label>
                  </div>
                </div>
              </div>
              <div class="form-button-wrapper">
                <input class="button sqs-system-button sqs-editable-button" type="submit" value="提交訂單">
                <a class="back-button" href="#">更改訂單</a>
              </div>
            </form>
          </div>
        </div>
      </div>`);

    this.root.find('.back-button').on('click', this.handleGoBack);
  }
}

export default OrderPreviewForm;
