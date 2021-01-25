const parsePriceLabel = (priceString) => parseFloat(priceString.replace('HK$', ''));

const getPriceLabel = (price) => `HK$${price}`;

export {
  parsePriceLabel,
  getPriceLabel,
};
