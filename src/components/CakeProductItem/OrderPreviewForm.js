import $ from 'jquery';
import BaseComponent from '../common/BaseComponent';
import { getPriceLabel } from '../../lib/currency';

class OrderPreviewForm extends BaseComponent {
  constructor(props) {
    super(props, $('<div class="sqs-widget sqs-async-form"/>'));

    this.state = { isTncAccepted: false, isMarketingAccepted: false };
  }

  handleOrderSubmit = (e) => {
    e.preventDefault();

    const { isMarketingAccepted } = this.state;

    this.props.onOrderButtonClick({ isMarketingAccepted });
  }

  handleBackButtonClick = (e) => {
    e.preventDefault();

    this.props.onBackButtonClick();
  }

  handleToggleTNC = (e) => {
    this.setState({ isTncAccepted: $(e.target).is(':checked') });
  }

  handleToggleMarketing = (e) => {
    this.setState({ isMarketingAccepted: $(e.target).is(':checked') });
  }

  render() {
    const {
      order,
    } = this.props;

    const {
      productName, quantity, unitPrice, additionalItems, contactDetails, orderDetails,
    } = order;

    const { isTncAccepted, isMarketingAccepted } = this.state;

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
                <h4>聯絡方法</h4>
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
                </div>`).join('')}
                <div class="form-item field">
                  <legend class="title">條款及細則，以及私隱政策聲明 *</legend>
                  <div class="option">
                    <label>
                      <input name="accept-terms" type="checkbox" ${isTncAccepted ? 'checked' : ''}/>
                      我已閱讀，理解及同意有關<a href='/terms-of-service' target='_blank'>條款及細則</a>，以及<a href='/privacy-policy' target='_blank'>私隱政策聲明</a>。
                    </label>
                  </div>
                </div>
                <div class="form-item field">
                  <legend class="title">個人資料用於推廣</legend>
                  <div class="option">
                    <label>
                      <input name="accept-marketing" type="checkbox" ${isMarketingAccepted ? 'checked' : ''}/>
                      閣下不想資料被用作直接推廣的用途
                    </label>
                  </div>
                </div>
              </div>
              <div class="form-button-wrapper">
                <input class="button sqs-system-button sqs-editable-button" type="submit" value="提交訂單"/>
                <a class="back-button" href="#">更改訂單</a>
              </div>
            </form>
          </div>
        </div>
      </div>`);

    this.root.find('input[type=submit]').on('click', this.handleOrderSubmit);
    this.root.find('.back-button').on('click', this.handleBackButtonClick);
    this.root.find('input[name=accept-terms]').on('click', this.handleToggleTNC);
    this.root.find('input[name=accept-marketing]').on('click', this.handleToggleMarketing);
  }
}

export default OrderPreviewForm;
