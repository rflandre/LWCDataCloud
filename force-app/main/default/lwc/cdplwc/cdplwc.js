import {    LightningElement,api, wire } from 'lwc';
import { getRecord } from "lightning/uiRecordApi";
import fetchDCCodeInfos from '@salesforce/apex/FetchDataCloudInfo.showCodeDetails';
const FIELDS = ["Account.Name", "Account.AccountNumber", "Account.goldenID__c", "Account.Id"];

export default class Cdplwc extends LightningElement {
    @api recordId;
    @wire(getRecord, { recordId: "$recordId", fields: FIELDS })
    account;
  
    data;
    ssot__Id__c;
    ssot__Name__c;
    ssot__Number__c;
    ssot__Description__c;
    showSummaryDetail;
    noGoldenIdFound;
    isLoaded = false;
    handleBtnClick(event) {
        let validateInput = this.template.querySelector(".GoldenId");
        let validateValue = validateInput.value;
        if (!validateValue) {
            validateInput.setCustomValidity("GoldenId is required");
            this.showSummaryDetail = false;
        } else {
            validateInput.setCustomValidity(""); // clear previous value
        }
        validateInput.reportValidity();
        if (validateValue) {
            this.isLoaded = !this.isLoaded;
            let GoldenIdValue = this.template.querySelector('lightning-input').value;
            fetchDCCodeInfos({
                    GoldenId: GoldenIdValue
                })
                .then(result => {
                    if (result != '') {
                        let obj = {};
                        obj = result;
                        console.log('check obj' + JSON.stringify(result));
                        this.parsedValue = JSON.parse(result);
                        console.log('check obj' + JSON.stringify(result));
                        console.log('this.parsedValue.data ' + this.parsedValue.data[0]);
                        console.log('this.parsedValue.ssot__Id__c ' + this.parsedValue.data[0].ssot__Description__c);
                        console.log('this.account.Name ' + this.account.data.fields.Name.value);
                        console.log('this.account.Id ' + this.account.data.fields.Id.value);
                        console.log('this.account.goldenID__c ' + this.account.data.fields.goldenID__c.value);                        
                        
                        if (JSON.stringify(obj) === '{}') {
                            this.showSummaryDetail = false;
                            this.noGoldenIdFound = true;
                            this.isLoaded = false;
} else {
                            this.isLoaded = false;
                            this.showSummaryDetail = true;
                            this.noGoldenIdFound = false;
                            this.ssot__Id__c=this.parsedValue.data[0].ssot__Id__c;
                            this.ssot__Name__c=this.parsedValue.data[0].ssot__Name__c;
                            this.ssot__ExpectedRevenueAmount__c=this.parsedValue.data[0].ssot__ExpectedRevenueAmount__c;
                            this.ssot__TotalAmount__c = this.parsedValue.data[0].ssot__TotalAmount__c;
                            this.ssot__Description__c=this.parsedValue.data[0].ssot__Description__c;
                            this.ssot__OpportunityStage__c= this.this.parsedValue.data[0].ssot__OpportunityStage__c;

                        }
}
})
                .catch(error => {
                    console.log('error: ', error);
                });
        }
}
}
