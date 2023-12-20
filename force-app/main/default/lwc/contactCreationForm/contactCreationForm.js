import { LightningElement, api, wire } from 'lwc';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';

export default class ContactCreationForm extends LightningElement {
    // these variables hold the values of the input fields

    @api firstNameVar = '';
    @api lastNameVar = '';
    @api emailVar = '';

    // evetn handler method to capture the input changes
    handleInputChange(event) {
        const field = event.target.name;
        if (field === 'firstNameVar') {
            this.firstNameVar = event.target.value;
        } else if (field === 'lastNameVar') {
            this.lastNameVar = event.target.value;
        } else if (field === 'emailVar') {
            this.emailVar = event.target.value;
        }
    }

    // Method to pass values to the flow when proceeding to the next step
    @api
    handleNext() {

        const navigateNextWithOutputVariables = new FlowNavigationNextEvent({
            outputVariables: [
                {
                    name: 'firstNameVar',
                    type: 'String',
                    value: this.firstNameVar
                },
                {
                    name: 'lastNameVar',
                    type: 'String',
                    value: this.lastNameVar
                },
                {
                    name: 'emailVar',
                    type: 'String',
                    value: this.emailVar
                }
            ]
        });
        console.log('First Name:', this.firstNameVar);
        console.log('Last Name:', this.lastNameVar);
        console.log('Email:', this.emailVar);

        this.dispatchEvent(navigateNextWithOutputVariables);
    }
    
    //on change event handler
    handleClickNext() {
        this.handleNext();
    }
}