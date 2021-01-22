// hijack the Add to Cart button in order form
import $ from 'jquery';
import validator from '../../common/validator';
import OrderPreviewForm from './OrderPreviewForm';

class OrderForm {
  constructor({ selector, productVariants }) {
    this.root = $(selector);

    this.form = this.root.find('form');
    this.formItems = this.form.find('.form-item');

    this.productVariants = productVariants;

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

  showOrderPreview = () => {
    this.form.hide();

    const orderPreviewForm = new OrderPreviewForm({ productVariants: this.productVariants });
    this.root.find('.form-inner-wrapper').append(orderPreviewForm.render());
  }

  renderErrorField = (errorMessage) => $(`<div class="field-error">${errorMessage}</div>`)

  handleFormSubmit = (e) => {
    e.preventDefault();

    // if (!this.isFormValid()) {
    //   return;
    // }

    this.showOrderPreview();

    console.log('form valid');
  };
}

export default (options) => new OrderForm(options);
