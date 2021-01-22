import $ from 'jquery';
import BaseComponent from '../BaseComponent';

class ProductVariantsForm extends BaseComponent {
  constructor(props) {
    super(props, $(props.selector));

    this.variantOptions = this.root.find('.variant-option');
  }

  isFormValid = () => $.map(this.variantOptions, (variantOption) => !!$(variantOption).find('select').val())
    .reduce((acc, val) => acc && val)

  getProductVariants = () => $.map(this.variantOptions, (variantOption) => {
    const label = $(variantOption).find('.variant-option-title').text().split(':')[0];
    const value = $(variantOption).find('.variant-select-wrapper select').val();

    return { label, value };
  }).reduce((acc, { label, value }) => ({ ...acc, [label]: value }), {})
}

export default (options) => new ProductVariantsForm(options);
