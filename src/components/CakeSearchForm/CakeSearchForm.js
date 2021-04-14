import $ from 'jquery';
import BaseComponent from '../BaseComponent/BaseComponent';
import CakeSearchOptions from '../../models/CakeSearchOptions';

class CakeSearchForm extends BaseComponent {
  constructor(props) {
    super(props, $(props.selector));

    this.searchOptions = this.parseSearchOptions();

    this.state = {
      searchOptions: this.searchOptions,
    };
  }

  parseSearchOptions = () => new CakeSearchOptions(window.location.search)

  handleOccasionChange = (e) => {
    this.searchOptions.occasion = $(e.target).val();

    window.location.search = this.searchOptions.toQueryString();
  }

  handlePriceChange = (e) => {
    this.searchOptions.priceRange = $(e.target).val();

    window.location.search = this.searchOptions.toQueryString();
  }

  handleCakeShopChange = (e) => {
    this.searchOptions.cakeshop = $(e.target).val();

    window.location.search = this.searchOptions.toQueryString();
  }

  render() {
    return `<form class="cake-search-form">
      <div class="select-wrapper">
        <select class="select-occasion wide">
          <option data-display="按此選擇場合" value="occasion-any">所有場合</option>
          <option value="occasion-birthday">生日蛋糕</option>
          <option value="occasion-christmas">聖誕蛋糕</option>
        </select>
      </div>
      <div class="select-wrapper">
        <select class="select-price wide">
          <option data-display="按此選擇價錢" value="price-any">所有價錢</option>
          <option value="price-0-500">$500以下</option>
          <option value="price-501-1000">$501至$1000</option>
          <option value="price-1001+">$1001或以上</option>
        </select>
      </div>
      <div class="select-wrapper">
        <select class="select-cakeshop wide">
          <option data-display="按此選擇商戶" value="any">所有商戶</option>
          <option value="Sakura Bakery">Sakura Bakery</option>
          <option value="CHI CHI TSUM">CHI CHI TSUM</option>
          <option value="Bu Guu Bake House">Bu Guu Bake House</option>
          <option value="Bu Guu Bake House">So Baked</option>
          <option value="Bu Guu Bake House">So Baked 123</option>
        </select>
      </div>
    </form>`;
  }

  postRender = () => {
    $('.select-occasion').niceSelect();
    $('.select-price').niceSelect();
    $('.select-cakeshop').niceSelect();

    $('.select-occasion').on('change', this.handleOccasionChange);
    $('.select-price').on('change', this.handlePriceChange);
    $('.select-cakeshop').on('change', this.handleCakeShopChange);
  }
}

export default CakeSearchForm;
