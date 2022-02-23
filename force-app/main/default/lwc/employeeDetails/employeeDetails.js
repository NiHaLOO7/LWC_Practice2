import { LightningElement, wire } from 'lwc';
import getSkills from '@salesforce/apex/GetSkill.getSkills'
//import getSkillss from '@salesforce/apex/GetSkill.getSkillss'          //Experimental Method
import submitt from '@salesforce/apex/GetSkill.submitt'
import callout from '@salesforce/apex/Callout.calloutGet'
import sendJson from '@salesforce/apex/Callout.sendJson'
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
export default class EmployeeDetails extends LightningElement {
    validation = false
    //empId = 'a005g000030tt8CAAQ'                      //Experimental
    skill                                                   //Skills of the Employee
    valuea                                                  //value of comboBox 1
    valuee                                                  //value of comboBox 2
    ids   = []                                              //options of comboBox 1
    names = []                                              //options of comboBox 2
    comment                                                 //Comment Given By Employee

    handleClick(event) {
        this.validation = !this.validation                //Showing of the app on click of lightning-button
        this.skill = ""
        this.valuea = ""                                     //Reset
        this.valuee = ""
        this.comment = ""
    }

    @wire(callout)                                          // gets Deserialised JSON and converts it to list
    empHandler({ data, error }) {                           // and then set those list as combobox options
        if (data) {
            ////console.log(data)           //Debug
            //console.log(data.data)
            this.generateList(data.data)

        }
        if (error) {
            console.error(error)
        }
    }


    /*@wire(getSkillss,{empId:'$empId'})                    // Experiment to run two @wire at a time
    wiredSkill({data, error}){                 
        if(data){
            console.log(data)
        }
        if(error){
            console.error(error)
        }
    }*/


    generateList(data) {                             //generating list to set Options of both comboBoxes
        for (var i = 0; i < data.length; ++i) {
            this.ids = [...this.ids, { value: data[i].id, label: data[i].id }];
            this.names = [...this.names, { value: data[i].employee_name, label: data[i].employee_name }];
        }
    }


    commentHandler(event) {
        this.comment = event.target.value
        //const area = this.template.querySelector('lightning-textarea')
        event.target.setCustomValidity("")
        event.target.reportValidity();

    }


    handleChange(event) {                                                  //combobox 1 change handler
        //const cmbo = this.template.querySelector('.combo')
        event.target.setCustomValidity("")
        event.target.reportValidity();
        this.valuea = event.detail.value
        this.callApex(this.valuea)
    }
    handleChangee(event) {                                                //combobox 2 change handler
        this.valuee = event.detail.value
        //const cmboa = this.template.querySelector('.comboa')
        event.target.setCustomValidity("")
        event.target.reportValidity();
    }



    callApex(vall) {                                                    //Calls Apex method to get the skills
        getSkills({ empId: vall })                                      // of selected employee
            .then(result => {
                let arr = Array.from(result)
                    //console.log(arr)
                for (var j = 0; j < arr.length; ++j) {                 //Handles if anyone has multiple skills
                    if (j === 0) {
                        this.skill = arr[j].Skill_Name__c
                    } else {
                        this.skill = this.skill + ", " + arr[j].Skill_Name__c
                    }
                }
            }).catch(error => {
                console.error(error)
            })
    }


    showToast(title, message, variant) {                               //function to make toast instances
        const event = new ShowToastEvent({
            title,
            message,
            variant,
            messageData: [
                'Salesforce', {
                    url: 'http://www.salesforce.com/',
                    label: 'Click Here'
                }
            ],
            mode: 'dismissible'
        })
        this.dispatchEvent(event)
    }


    callApexA() {                                                    //Calling DML operation to update
        //console.log(this.comment+" => "+this.valuea)               // comment into the employee Object
        submitt({ comment: this.comment, name: this.valuea })
            .then(result => {
                let listt = [this.valuea, this.valuee,
                    this.skill, this.comment
                ]
                sendJson({ data: listt })                          //Method to send the data to Apex and
                    .then(result => {                              // debug the Json file created to post
                        this.validation = false
                        this.showToast("Success!!", "Comment Successfully Added!!", "success")
                    }).catch(error => {
                        this.validation = false
                        this.showToast("failure!!", "An Error Occured!!", "error")
                    })
            }).catch(error => {
                console.error(error)
            })
    }


    submit() { //Submit Button Handler
        const cmbo = this.template.querySelector('.combo')
        const cmboa = this.template.querySelector('.comboa')
        const inpu = this.template.querySelector('lightning-input')
        const area = this.template.querySelector('lightning-textarea')

        //Checking if any field is empty via Custom Validity
        if (!cmbo.value) {
            cmbo.setCustomValidity("Please Select Your Employee Id")
        } else {
            cmbo.setCustomValidity("")                                    // clear previous value
        }
        cmbo.reportValidity();
        if (!cmboa.value) {
            cmboa.setCustomValidity("Please Select The Employee Name")
        } else {
            cmboa.setCustomValidity("")
        }
        cmboa.reportValidity();
        if (!inpu.value) {
            inpu.setCustomValidity("Skills Can Not Be Empty")
        } else {
            inpu.setCustomValidity("")
        }
        inpu.reportValidity();
        if (!area.value) {
            area.setCustomValidity("Comments can not be Empty")
        } else {
            area.setCustomValidity("")
        }
        area.reportValidity();
        if (this.valuea && this.valuee && this.skill && this.comment) {
            this.callApexA()
        }

    }

    /*reset() {
    const cmbo = this.template.querySelector('.combo')
    const cmboa = this.template.querySelector('.comboa')
    const inpu = this.template.querySelector('lightning-input')
    const area = this.template.querySelector('lightning-textarea')
    cmbo.setCustomValidity("")
    cmboa.setCustomValidity("")
    inpu.setCustomValidity("")
    area.setCustomValidity("")
    cmbo.reportValidity();
    cmboa.reportValidity();
    inpu.reportValidity();
    area.reportValidity();
    this.skill = ""
    this.valuea = "" //Reset
    this.valuee = ""
    this.comment = ""
}*/


    reset() {
        this.cancel()
            //this.validation = true;
        setTimeout(() => {
            this.validation = true;
        }, 0)
    }

    cancel() {
        this.validation = false;
        const cmbo = this.template.querySelector('.combo')
        const cmboa = this.template.querySelector('.comboa')
        const inpu = this.template.querySelector('lightning-input')
        const area = this.template.querySelector('lightning-textarea')
        cmbo.setCustomValidity("")
        cmboa.setCustomValidity("")
        inpu.setCustomValidity("")
        area.setCustomValidity("")
        cmbo.reportValidity();
        cmboa.reportValidity();
        inpu.reportValidity();
        area.reportValidity();
        this.skill   = ""
        this.valuea  = ""                                    
        this.valuee  = ""
        this.comment = ""
    }
}