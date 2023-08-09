public with sharing class FetchDataCloudInfo {
  
    @AuraEnabled
    public static String showCodeDetails(String GoldenId){
        String returnBody;
        Http http = new Http();
        HttpRequest request = new HttpRequest();
         
        // Provide the Named Credentials
        //request.setEndpoint('callout:DC_Query_API/services/data/v56.0/ssot/profile/ssot__Account__dlm/'+GoldenId+'?fields=ssot__Id__c,ssot__Name__c,ssot__Number__c,ssot__Description__c');
        //request.setMethod('GET'); 


        // Post a request 
        request.setEndpoint('callout:DC_Query_API/services/data/v56.0/ssot/query');
        request.setMethod('POST'); 
        String jsonBody =  '{  "sql" : " SELECT ssot__OpportunityStage__c, ssot__TotalAmount__c, ssot__ExpectedRevenueAmount__c, ssot__Description__c, ssot__Name__c, ssot__CustomerAccountId__c, ssot__Id__c from ssot__Opportunity__dlm  JOIN (select ssot__Id__c as Id, ssot__Account__dlm.goldenId__c  from ssot__Account__dlm where goldenId__c=\''+ GoldenId +'\' )  as SubQuery1 on ssot__Opportunity__dlm.ssot__CustomerAccountId__c = SubQuery1.Id " }';
//        String jsonBody =  '{ "sql" : "select ssot__Id__c, ssot__Name__c, ssot__Number__c, ssot__Description__c from ssot__Account__dlm where goldenId__c=\''+GoldenId+'\'"}';
        system.debug('body debg :'+jsonBody);
        //request.setEndpoint('callout:DC_Query_API/services/data/v56.0/ssot/profile/metadata');
        //request.setHeader('Authorization','Bearer 00D06000000zDtg!ARQAQEIb2qMzBqhG7CIJWVM1DHsHQ2MMZbkAVdwwq8gvZqPZ5CfNyN0jNXOFm6G830cSVsllKR.9G8Aagh9m7GC_0FTxV5x4');
        request.setHeader('Connection', 'keep-alive');
        request.setHeader('Accept', 'application/json');
        request.setHeader('Content-Type', 'application/json');
        request.setBody(jsonBody);
        request.setTimeout(120000);

        HttpResponse response = http.send(request);

        System.debug(LoggingLevel.DEBUG, request);

        
        if (response.getStatusCode() == 200  || response.getStatusCode() == 201) {
            String resBody = response.getbody();
            system.debug('body return debg :'+resBody);

            returnBody = resBody;
        }
        return returnBody;
    }
}



