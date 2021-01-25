class Order {
  constructor(
    productName,
    quantity,
    unitPrice,
    productVariants,
    additionalItems,
    contactDetails,
    orderDetails,
    isMarketingAccepted = false,
  ) {
    this.productName = productName;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.productVariants = productVariants;
    this.additionalItems = additionalItems;
    this.contactDetails = contactDetails;
    this.orderDetails = orderDetails;
    this.isMarketingAccepted = isMarketingAccepted;
  }

  getTotalAmount = () => this.quantity * this.unitPrice

  getProductVariantsDesc = () => this.productVariants.map(({ label, value }) => `${label}: ${value}`).join(', ');
}

export default Order;
