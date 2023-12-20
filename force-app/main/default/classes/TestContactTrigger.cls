@isTest
private class TestContactTrigger {
    @isTest static void testContactCount() {
        // Create test account
        Account testAcc = new Account(Name = 'Test Account');
        insert testAcc;

        // Test insert operation
        Contact testCon1 = new Contact(AccountId = testAcc.Id, FirstName='Test', LastName = 'Test Contact 1');
        insert testCon1;

        // Refresh the test account
        testAcc = [SELECT Total_Contacts__c FROM Account WHERE Id = :testAcc.Id];
        Assert.areEqual(1, testAcc.Total_Contacts__c);

        // Test update operation
        Contact testCon2 = new Contact(AccountId = testAcc.Id, FirstName='Test', LastName = 'Test Contact 2');
        insert testCon2;

        testAcc = [SELECT Total_Contacts__c FROM Account WHERE Id = :testAcc.Id];
        Assert.areEqual(2, testAcc.Total_Contacts__c);
        
        // Test delete operation
        delete testCon1;

        testAcc = [SELECT Total_Contacts__c FROM Account WHERE Id = :testAcc.Id];
        Assert.areEqual(1, testAcc.Total_Contacts__c);
    }
}