// hijack the Add to Cart button in order form
import $ from 'jquery';
import validator from '../../../lib/validator';
import getDateAfter from '../../../lib/date';
import ErrorField from '../../FieldError/FieldError';
import BaseComponent from '../../BaseComponent/BaseComponent';
import i18n from '../../../i18n/i18n';

class OrderForm extends BaseComponent {
  constructor(props) {
    super(props, $(props.selector));

    this.form = this.root.find('.form-wrapper');
    this.formItems = this.form.find('form .form-item');

    // rearrange the form
    this.updateForm();

    // add handlers
    this.form.find('input[type=submit]').on('click', this.handleFormSubmit);
  }

  updateForm = () => {
    this.root.find('fieldset.date .year').insertBefore(this.root.find('fieldset.date .month'));
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
    } else if (formItem.hasClass('radio')) {
      const options = formItem.find('input');

      for (let j = 0; j < options.length; j += 1) {
        const option = $(options[j]);

        if (option.is(':checked')) {
          value = option.val();

          break;
        }
      }
    } else if (formItem.hasClass('date')) {
      const year = formItem.find('.year input').val();
      const month = formItem.find('.month input').val().padStart(2, '0');
      const day = formItem.find('.day input').val().padStart(2, '0');

      if (year && month && day) {
        value = `${year}-${month}-${day}`;
      }
    } else if (formItem.hasClass('select')) {
      value = formItem.find('select').val();
    } else if (formItem.hasClass('text')) {
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
      const daysToPrepare = parseInt(this.root.find('input[name=SQF_DAYS_TO_PREPARE]').val(), 10) || 0;

      let isValid = true;
      let errorMessage = '';

      // 1. check if required
      if (isRequired && isEmpty) {
        errorMessage = i18n('CAKE_ORDER_FORM.ERROR.FIELDREQUIRED', { label });
        isValid = false;
      }

      // 2. check if field is valid
      if (isValid) {
        switch (label) {
          case i18n('CAKE_ORDER_FORM.PHONE.LABEL'):
            isValid = validator.validatePhone(value);

            if (!isValid) {
              errorMessage = i18n('CAKE_ORDER_FORM.ERROR.PHONE.INVALID_FORMAT');
            }

            break;
          case i18n('CAKE_ORDER_FORM.SHIPPING_DATE.LABEL'):
            isValid = validator.validateDate(value);

            if (!isValid) {
              errorMessage = i18n('CAKE_ORDER_FORM.ERROR.DATE.INVALID_FORMAT');
            }

            isValid = validator.validateDateAfter(value, daysToPrepare);

            if (!isValid) {
              errorMessage = i18n('CAKE_ORDER_FORM.ERROR.DATE.LESS_THAN_AVAILABLE_DATE', { date: getDateAfter(daysToPrepare) });
            }

            break;
          default:
            break;
        }
      }

      formValid &&= isValid;

      // handle error tips
      let fieldError = formItem.find('.field-error');
      if (errorMessage) {
        if (fieldError.length === 0) {
          fieldError = formItem.append(ErrorField({ errorMessage }));
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
  })

  getName = () => this.getAllFields().filter(({ label }) => label === i18n('CAKE_ORDER_FORM.NAME.LABEL'))[0].value;

  getPhone = () => this.getAllFields().filter(({ label }) => label === i18n('CAKE_ORDER_FORM.PHONE.LABEL'))[0].value;

  getPreferredIM = () => this.getAllFields().filter(({ label }) => label === i18n('CAKE_ORDER_FORM.PREFERRED_IM.LABEL'))[0].value;

  getIGAccount = () => this.getAllFields().filter(({ label }) => label === i18n('CAKE_ORDER_FORM.IG_ACCOUNT.LABEL'))[0].value;

  getAdditionalItems = () => this.getAllFields().filter(({ label }) => label === i18n('CAKE_ORDER_FORM.ADDITIONAL_ITEMS.LABEL'))[0].value.split(',');

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

  handleFormSubmit = (e) => {
    e.preventDefault();

    if (!this.isFormValid()) {
      return;
    }

    this.props.showOrderPreviewForm();
  };
}

export default OrderForm;
