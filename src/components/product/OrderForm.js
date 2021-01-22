// hijack the Add to Cart button in order form
import $ from 'jquery';
import validator from '../../common/validator';

class OrderForm {
  constructor({ selector }) {
    this.root = $(selector);

    this.root.find('input[type=submit').on('click', this.handleFormSubmit);
    this.formItems = this.root.find('.form-item');
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

  verifyFields = () => {
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
          fieldError = formItem.append(`<div class="field-error">${errorMessage}</div>`);
        } else {
          fieldError.text(errorMessage);
        }
      } else {
        fieldError.remove();
      }
    }

    return formValid;
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    if (this.verifyFields()) {
      // post data to api
    }
  };
}

export default (options) => new OrderForm(options);
