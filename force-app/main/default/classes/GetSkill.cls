/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 10-12-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class GetSkill {
    @AuraEnabled(cacheable=true)
    public static List<Skill__c> getSkills(String empId) {
        List<Employee__c> lstId = [SELECT Id FROM Employee__c WHERE Name = :empId LIMIT 1];
        ID rowId = lstId[0].id;
        return [SELECT Skill_Name__c FROM Skill__c WHERE Employee_Id__c = :rowId];
    }

    /*@AuraEnabled(cacheable=true)
    public static List<Skill__c> getSkillss(String empId) {
        return [SELECT Skill_Name__c FROM Skill__c WHERE Employee_Id__c = :empId];
    }*/

    @AuraEnabled
    public Static Boolean submitt(String comment, String name){
        Employee__c emp = [SELECT Comments__c FROM Employee__c WHERE Name=:name LIMIT 1];
        emp.Comments__c = comment;
        try{
            update emp;
            return true;
        }
        catch (Exception e) {
            System.debug(e.getMessage());
        }
        return false;
     }
    
    
}