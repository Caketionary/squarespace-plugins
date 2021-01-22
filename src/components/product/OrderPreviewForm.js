import $ from 'jquery';

class OrderPreviewForm {
  constructor() {
    console.log('ere');
  }

  render = () => $(`
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
      </div>
    </form>`)
}

export default (options) => new OrderPreviewForm(options);
