import $ from 'jquery';
import BaseComponent from '../common/BaseComponent';

class OrderSuccessView extends BaseComponent {
  constructor(props) {
    super(props, $('<div class="sqs-widget sqs-async-form"/>'));
  }

  render() {
    this.root.append(`
        <div class="sqs-async-form-content">
          <div class="form-wrapper">
            <div class="form-title">訂單提交成功</div>
            <div class="form-inner-wrapper">
              <p>你的訂單資料已提交成功，請耐心等代餅店方面的回覆</p>
            </div>
          </div>
        </div>
    `);
  }
}

export default OrderSuccessView;
