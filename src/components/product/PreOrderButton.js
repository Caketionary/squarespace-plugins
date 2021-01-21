import $ from 'jquery'
import OrderForm from './OrderForm'
import { waitForElement } from '../../common/util'

class PreOrderButton {
    
    constructor({root}) {
        this.root = $(root)
        this._OrderForm = OrderForm

        this.root.on('click', this.handleOnClick.bind(this))
    }

    handleOnClick() {
        waitForElement('.sqs-async-form form', this.createForm.bind(this))
    }

    createForm() {
        const OrderForm = new this._OrderForm('.sqs-async-form form');
    }    
}

export default PreOrderButton