import $ from 'jquery';

class ProductVariantsForm {
  constructor({ selector }) {
    this.root = $(selector);
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
