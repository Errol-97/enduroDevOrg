import { LightningElement, wire, track } from 'lwc';
import updateUsers from '@salesforce/apex/SystemAdminUserController.updateUsers';
import { refreshApex } from '@salesforce/apex';


export default class UserManagementComponent extends LightningElement {
    @track columns = COLUMNS;
    @track users = [];
    @track draftValues = [];

    @wire(getSystemAdminUsers)
    wiredUsers({ error, data }) {
        if (data) {
            this.users = data;
        } else if (error) {
            console.error(error);
        }
    }

    handleRowChange(event) {
        this.draftValues = event.detail.draftValues;
    }

    async handleSave(event) {
        const updatedFields = event.detail.draftValues;
    
        try {
            const result = await updateUsers({ userList: updatedFields });
            console.log('Users updated', result);
    
            // Refresh table data
            await refreshApex(this.users);

            //Now reload the page to refresh the entire component/page
            location.reload();
        } catch (error) {
            console.error('Error updating users', error.body.message);
        }
    }
}


import getSystemAdminUsers from '@salesforce/apex/SystemAdminUserController.getSystemAdminUsers';

const COLUMNS = [
    { label: 'First Name', fieldName: 'FirstName', editable: true },
    { label: 'Last Name', fieldName: 'LastName', editable: true },
    { label: 'IsActive', fieldName: 'IsActive', editable: true },
    { label: 'Email', fieldName: 'Email', type: 'email', editable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
    { label: 'Username', fieldName: 'Username', editable: true }
];