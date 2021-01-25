// hijack the Add to Cart button in order form
import $ from 'jquery';
import validator from '../../lib/validator';
import BaseComponent from '../common/BaseComponent';
import i18n from '../../i18n/i18n';

class OrderForm extends BaseComponent {
  constructor(props) {
    super(props, $(props.selector));

    this.form = this.root.find('.form-wrapper');
    this.formItems = this.form.find('form .form-item');

    // add handlers
    this.form.find('input[type=submit]').on('click', this.handleFormSubmit);
  }

  getFieldValue = (formItem) => {
    let value = '';

    if (formItem.hasClass('checkbox')) {
      const options = formItem.find('input');
      const values = [];

      for (let j = 0; j < options.length; j += 1) {
        const option = $(options[j]);

        if (option.is(':checked')) {
          values.push(option.val());
        }
      }

      value = values.join(',');
    } else if (formItem.hasClass('date')) {
      const year = formItem.find('.year input').val();
      const month = formItem.find('.month input').val().padStart(2, '0');
      const day = formItem.find('.day input').val().padStart(2, '0');

      if (year && month && day) {
        value = `${year}-${month}-${day}`;
      }
    } else {
      value = formItem.find('input').val().trim();
    }

    return value;
  }

  isFormValid = () => {
    let formValid = true;

    for (let i = 0; i < this.formItems.length; i += 1) {
      const formItem = $(this.formItems[i]);
      const isRequired = formItem.hasClass('required');
      const label = $(formItem.find('.title').contents().get(0)).text().trim();
      const value = this.getFieldValue(formItem);
      const isEmpty = !value;

      let isValid = true;
      let errorMessage = '';

      // 2 check if valid
      switch (label) {
        case '電話號碼':
          isValid = validator.validatePhone(value);
          break;
        case '取餅日子':
          isValid = validator.validateDate(value);
          break;
        default:
          break;
      }

      formValid &&= isValid;

      console.log(`${label}, ${value}`);

      // checking
      // 1 check required
      if (isRequired && isEmpty) {
        errorMessage = `請填寫${label}`;
      } else if (!isValid) {
        errorMessage = '格式不正確';
      }

      // handle error tips
      let fieldError = formItem.find('.field-error');
      if (errorMessage) {
        if (fieldError.length === 0) {
          fieldError = formItem.append(this.renderErrorField(errorMessage));
        } else {
          fieldError.text(errorMessage);
        }
      } else {
        fieldError.remove();
      }
    }

    return formValid;
  }

  getAllFields = () => $.map(this.formItems, (formItem) => {
    const label = $($(formItem).find('.title').contents().get(0)).text().trim();
    const value = this.getFieldValue($(formItem));

    return { label, value };
  })// .reduce((acc, { label, value }) => ({ ...acc, [label]: value }), {})

  getName = () => this.getAllFields().filter(({ label }) => label === i18n('CAKE_ORDER_FORM.NAME.LABEL'))[0].value;

  getPhone = () => this.getAllFields().filter(({ label }) => label === i18n('CAKE_ORDER_FORM.PHONE.LABEL'))[0].value;

  getPreferredIM = () => this.getAllFields().filter(({ label }) => label === i18n('CAKE_ORDER_FORM.PREFERRED_IM.LABEL'))[0].value;

  getIGAccount = () => this.getAllFields().filter(({ label }) => label === i18n('CAKE_ORDER_FORM.IG_ACCOUNT.LABEL'))[0].value;

  getAdditionalItems = () => this.getAllFields().filter(({ label }) => label === i18n('CAKE_ORDER_FORM.ADDITIONAL_ITEMS.LABEL'))[0].value;

  getOrderDetails = () => this.getAllFields().filter(({ label }) => {
    const excludedLabels = [
      i18n('CAKE_ORDER_FORM.NAME.LABEL'),
      i18n('CAKE_ORDER_FORM.PHONE.LABEL'),
      i18n('CAKE_ORDER_FORM.PREFERRED_IM.LABEL'),
      i18n('CAKE_ORDER_FORM.IG_ACCOUNT.LABEL'),
      i18n('CAKE_ORDER_FORM.ADDITIONAL_ITEMS.LABEL'),
    ];

    return !excludedLabels.includes(label);
  })

  renderErrorField = (errorMessage) => $(`<div class="field-error">${errorMessage}</div>`)

  handleFormSubmit = (e) => {
    e.preventDefault();

    // if (!this.isFormValid()) {
    //   return;
    // }

    this.props.showOrderPreviewForm();
  };
}

export default OrderForm;
