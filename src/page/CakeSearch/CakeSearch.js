import $ from 'jquery';
import BaseComponent from '../../components/BaseComponent/BaseComponent';

class CakeSearch extends BaseComponent {
  constructor(props) {
    super(props, $(props.selector));

    $('.select-occasion').niceSelect();
    $('.select-price').niceSelect();
    $('.select-cakeshop').niceSelect();
  }
}

export default CakeSearch;
