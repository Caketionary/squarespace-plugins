import $ from 'jquery';
import BaseComponent from '../../components/BaseComponent/BaseComponent';
import CakeSearchForm from '../../components/CakeSearchForm/CakeSearchForm';

class CakeSearch extends BaseComponent {
  constructor(props) {
    super(props, $(props.selector));

    this.cakeSearchForm = new CakeSearchForm({
      selector: '.cake-search-form-wrapper',
    });
  }
}

export default CakeSearch;
