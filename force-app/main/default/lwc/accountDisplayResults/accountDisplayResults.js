import { LightningElement, api, track } from 'lwc';

export default class AccountDisplayResults extends LightningElement {
    @track selectedAccounts = [];

    @api
    setSelectedAccounts(accounts) {
        this.selectedAccounts = accounts;
    }
}
