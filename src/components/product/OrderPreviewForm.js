import $ from 'jquery';
import BaseComponent from '../BaseComponent';

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
    this.root.empty();

    this.root.append(`
      <div class="sqs-async-form-content">
        <div class="form-wrapper">
          <div class="form-title">確認訂單資料</div>
          <div class="form-inner-wrapper">
            <form>
              <div class="field-list clear">
                <div class="form-item field">
                  <label class="title">名字</label>
                  <div>Stanley Fok</div>
                </div>
                <div class="form-item field">
                  <label class="title">電話</label>
                  <div>+852-9345532</div>
                </div>
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

export default (props) => new OrderPreviewForm(props);
