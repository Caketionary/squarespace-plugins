import $ from 'jquery'
import OrderForm from './OrderForm'
import { waitForElement } from '../../common/util'

class PreOrderButton {
    
    constructor({root}) {
        this.root = $(root)

        this.root.on('click', this.handleOnClick)
    }

    handleOnClick = () => {
        waitForElement('.sqs-async-form form', this.createForm)
    }

    createForm = () => {
        const orderForm = new OrderForm('.sqs-async-form form');
    }    
}

export default PreOrderButton