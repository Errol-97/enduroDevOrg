import { LightningElement, api, wire, track } from 'lwc';
import searchAccounts from '@salesforce/apex/AccountSearchController.searchAccounts';

export default class FlowAccountDisplay extends LightningElement {

    @api accounts;
    @api selectedAccountIds = []; 
    columns = [
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Established Date', fieldName: 'Established_Date__c' },
        { label: 'Legacy Type', fieldName: 'Legacy_Type__c' },
        { label: 'Disadvantaged Business Concern', fieldName: 'Disadvantaged_Business_Concern__c' }
    ];

    

    @wire(searchAccounts, {
        accountName: '$accountName',
        someDate: '$dateEstablished',
        picklistValue: '$legacyType',
        multiSelectValues: '$disadvantagedBusinessConcern'
    })
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
        } else if (error) {
            // Handle Error Logic
            this.error = error;
            this.accounts = undefined;
            this.showToast('Error', error.body.message, 'error');
        }
    }

    handleRowSelection(event) {
        const selectedRows = event.detail.selectedRows;
        this.selectedAccounts = selectedRows.map((row) => row.Id);
        this.selectedAccountIds = this.selectedRows.join(',');
        const attributeChangeEvent = new FlowAttributeChangeEvent('selectedAccountIds', this.selectedAccountIds);
        this.dispatchEvent(navigateNextEvent);
    }

}
