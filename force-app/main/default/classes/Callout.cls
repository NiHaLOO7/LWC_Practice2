/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 09-28-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
public with sharing class Callout {
    @AuraEnabled(cacheable=true)
        public static map<string,Object> calloutGet(){
            String str = '{"status":"success","data":[{"id":"143000","employee_name":"Tiger Nixon"},{"id":"143001","employee_name":"Neeraj Chopra"},{"id":"143002","employee_name":"Jack Sparrow"},{"id":"143003","employee_name":"Excel Blaze"},{"id":"143004","employee_name":"Shawn Frost"},{"id":"143005","employee_name":"Vegita"},{"id":"143006","employee_name":"Goku"},{"id":"143007","employee_name":"Nihal Jha"},{"id":"143008","employee_name":"Colleen Hurst"},{"id":"143009","employee_name":"Sonya Frost"},{"id":"143010","employee_name":"Jena Gaines"},{"id":"143011","employee_name":"Alexandra Daddario"}],"message":"Successfully! All records has been fetched."}';
            map<string,Object> mapjsondata=(map<string,Object>)JSON.deserializeUntyped(str);
            return mapjsondata;
        }
        
        @AuraEnabled(cacheable=true)
        public static void sendJson(List<String> data){
            Map<String, String> jMap = new Map<String, String>{'comment' => data[3]};
                String[] skl = data[2].split(', ');
                integer i = skl.size();
               for(String a:skl){
                    String ss = 'Skill-'+ i;
                   jMap.put(ss,a);
                   i = i - 1;
               }
            jMap.put('employee_name',data[1]);
            jMap.put('employee_id',data[0]);
    
                
                
                String jSon = JSON.serialize(jMap);
                System.debug(jSon);
               
    
            }
    
    }
