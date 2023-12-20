public with sharing class accountSearchController {

    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccounts(String accountName, Date someDate, String picklistValue, String multiSelectValues) {
        System.debug('ACCOUNT NAME -----> ' + accountName);
        System.debug('Date Established ------> ' + someDate);
        System.debug('Legacy Type -----> '+ picklistValue);
        System.debug('Disavantaged Business Concern -------> ' + multiSelectValues);
        String soqlQuery = 'SELECT Id, Name, Date_Established__c, Legacy_Type__c, Disadvantaged_Business_Concern__c FROM Account WHERE ';
        List<String> conditions = new List<String>();

        if (!String.isEmpty(accountName)) {
            conditions.add('Name LIKE :accountName');
        }

        if (someDate != null) {
            conditions.add('Date_Established__c = :someDate');
        }

        if (!String.isEmpty(picklistValue)) {
            conditions.add('Legacy_Type__c = :picklistValue');
        }

        if (!String.isEmpty(multiSelectValues)) {
            List<String> valuesList = multiSelectValues.split(';');
            conditions.add('Disadvantaged_Business_Concern__c IN :valuesList');
        }

        if (conditions.isEmpty()) {
            return new List<Account>();
        }

        soqlQuery += String.join(conditions, ' AND ');
        soqlQuery += ' LIMIT 1000'; // Limit for performance, adjust as needed
        System.debug('SOQL QUERY --------->' + soqlQuery);
        return Database.query(soqlQuery);
    }
}
