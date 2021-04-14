import qString from 'query-string';

class CakeSearchOptions {
  constructor(queryString) {
    const params = qString.parse(queryString);
    const { category, tag } = params;

    if (tag) {
      const tagTokens = tag.split(',');

      for (let i = 0; i < tagTokens.length; i += 1) {
        const tagToken = tagTokens[i];
        const n = tagToken.indexOf('-');

        if (n > 0) {
          const label = tagToken.substring(0, n);

          switch (label) {
            case 'occasion':
              this.occasion = tagToken;
              break;
            case 'price':
              this.priceRange = tagToken;
              break;
            default:
              break;
          }
        }
      }
    }

    // category is only used for cakeshop
    this.cakeshop = category;

    console.log([this.cakeshop, this.occasion, this.priceRange]);
  }

  toQueryString = () => {
    const qStringObj = {};
    const tags = [];

    if (this.cakeshop) qStringObj.category = this.cakeshop;

    if (this.occasion && this.occasion !== 'occasion-any') tags.push(this.occasion);
    if (this.priceRange && this.priceRange !== 'price-any') tags.push(this.priceRange);
    if (tags.length > 0) qStringObj.tag = tags.join(',');

    console.log(qString.stringify(qStringObj));

    return qString.stringify(qStringObj);
  }
}

export default CakeSearchOptions;
