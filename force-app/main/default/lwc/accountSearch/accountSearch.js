import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import searchAccounts from '@salesforce/apex/AccountSearchController.searchAccounts';

export default class AccountSearch extends LightningElement {
    @track searchParams = {};
    @track accounts;
    @track isModalOpen = false;
    selectedAccounts = [];

    columns = [
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Established Date', fieldName: 'Established_Date__c' },
        { label: 'Legacy Type', fieldName: 'Legacy_Type__c' },
        { label: 'Disadvantaged Business Concern', fieldName: 'Disadvantaged_Business_Concern__c' }
    ];

    handleRowSelection(event) {
        this.selectedAccounts = event.detail.selectedRows;
    }

    handleNext() {
        // Pass the selected records to the pagination component
        //this.template.querySelector('c-account-display-results').setSelectedAccounts(this.selectedAccounts);

        //display modal
        this.isModalOpen = true;
    }
    closeModal() {
        this.isModalOpen = false;
    }
    // Replace with real picklist values
    get legacyTypeOptions() {
        return [{ label: 'Global', value: 'Global' }, 
        { label: 'Local', value: 'Local' },
        { label: 'Chain', value: 'Chain' },
        { label: 'Mom-Pop Shop', value: 'Mom-Pop shop' },];
    }

    // Replace with real multi-select picklist values
    get disadvantagedBusinessConcernOptions() {
        return [{ label: 'HUBZone', value: 'HUBZone' }, 
        { label: 'Joint Venture Women Owned', value: 'Joint Venture Women Owned' },
        { label: 'Small Business - General', value: 'Small Business - General' },
        { label: 'Black Owned Business', value: 'Black Owned Business' },
        { label: 'Other', value: 'Other' },];
    }

    handleInputChange(event) {
        const field = event.target.dataset.field;
        this.searchParams[field] = event.target.value;
    }


    handleSearch() {
        searchAccounts({
            accountName: this.searchParams.AccountName,
            someDate: this.searchParams.Date_Established__c,
            picklistValue: this.searchParams.Legacy_Type__c,
            multiSelectValues: this.searchParams.Disadvantaged_Business_Concern
        })
        .then(result => {
            this.accounts = result;
        })
        .catch(error => {
            // Handle Error Logic
            this.error = error;
            this.accounts = undefined;
            this.showToast('Error', error.body.message, 'error');
        });
    }
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }

    handlePagination(event) {
        this.accounts = event.detail.updatedData;
    }
}

