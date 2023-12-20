public with sharing class InvocableAccountSearch {

    public class FlowInputs {
        @InvocableVariable(label='Account Name' required=false)
        public String accountName;

        @InvocableVariable(label='Date Established' required=false)
        public Date dateEstablished;

        @InvocableVariable(label='Legacy Type' required=false)
        public String legacyType;

        @InvocableVariable(label='Disadvantaged Business Concern' required=false)
        public String disadvantagedBusinessConcern;
    }

    @InvocableMethod(label='Search Accounts' description='Searches accounts based on the provided criteria')
    public static List<List<Account>> searchAccounts(List<FlowInputs> inputs) {
        FlowInputs input = inputs[0]; // Assuming single record input for simplicity

        String soqlQuery = 'SELECT Id, Name, Date_Established__c, Legacy_Type__c, Disadvantaged_Business_Concern__c FROM Account WHERE ';
        List<String> conditions = new List<String>();
        if (!String.isEmpty(input.accountName)) {
            conditions.add('Name LIKE :input.accountName');
            input.accountName = '%' + input.accountName + '%';
        }
        if (input.dateEstablished != null) {
            conditions.add('Date_Established__c = :input.dateEstablished');
        }
        if (!String.isEmpty(input.legacyType)) {
            conditions.add('Legacy_Type__c = :input.legacyType');
        }
        if (!String.isEmpty(input.disadvantagedBusinessConcern)) {
            conditions.add('Disadvantaged_Business_Concern__c = :input.disadvantagedBusinessConcern');
        }
        if (!conditions.isEmpty()) {
            soqlQuery += String.join(conditions, ' AND ');
        } else {
            return new List<List<Account>>();
        }
        List<Account> accounts = Database.query(soqlQuery);
        return new List<List<Account>> { accounts };
    }
}
