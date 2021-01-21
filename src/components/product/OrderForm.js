//hijack the Add to Cart button in order form
import $ from 'jquery'

class OrderForm {
    constructor({root}) {
        this.root = $(root)

        alert('form created')
    }
}

export default OrderForm