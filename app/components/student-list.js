/* eslint-disable prettier/prettier */
import Component from "@glimmer/component";
import { inject as service } from '@ember/service';
import { tracked } from "@glimmer/tracking";
import { task, timeout } from 'ember-concurrency';
import {action} from '@ember/object';

export default class StudentList extends Component{
    @service studentData;
    @tracked search="";
    @tracked allStudents=[...this.studentData.students];
    @tracked currentPage=1;
    @tracked page=30;
    @tracked isLoading=false;
    @tracked hasMore=true;
    @service router;
    @service flashMessages;


    @tracked columns=["rollno","name","dept","address","interests"];
    @tracked selectedColumns=["name"];

    get Students(){
        console.log(this.studentData.students);
        return this.allStudents.slice(0,this.currentPage*this.page);
    }

    constructor(){
        super(...arguments);
        this.loadInitial.perform();
    }

    @task
    *loadInitial(){
        console.log("Loading Initial")
        this.isLoading=true;
        yield timeout(300);
        this.hasMore=this.allStudents.length>this.page;
        this.isLoading=false;
    }

    @task
    *firstReached(){
        console.log("first reached1");
        console.log("first Reached 1",this.isLoading);
        console.log("first reachec 1",this.hasMore);
        if(this.currentPage<=1 || this.isLoading){
            return;
        }
        this.isLoading=true;
        yield timeout(500);
        this.currentPage--;
        this.isLoading=false;
        console.log("First Reached2");
    }

    @task
    *lastReached(){
        console.log("lastReached1")
        console.log("lastreached1",this.isLoading);
        console.log("lastreached1",this.hasMore);
        console.log("Last reached",this.currentPage*this.page);
        if(this.isLoading || !this.hasMore){
            return;
        }
        this.isLoading=true;
        yield timeout(500);
        this.currentPage++;
        this.hasMore=this.currentPage*this.page<this.allStudents.length;
        this.isLoading=false;
        console.log("Last Reached2");
    }

    @task({restartable:true})
    *searchText(event){
        this.search=event.target.value;
        this.currentPage=1;
        if(!this.search){
           this.allStudents=[...this.studentData.students];
        }else{
           yield this.allStudents=this.studentData.students.filter((student)=>{
            return this.selectedColumns.some((col) => {
                let value = student[col];
                if (value == null) return false;
                return String(value).toLowerCase().includes(this.search.toLowerCase());
              });
           });
        }
        console.log("After search");
        this.hasMore=this.allStudents.length>this.page;
    }

    @action
    clearText(){
        if(this.search.length<=0){
            return;
        }
        this.search="";
        this.currentPage=1;
        this.allStudents=[...this.studentData.students];
        this.hasMore=this.page<this.allStudents.length;
    }

    @action
    deleteAll(){
        if(this.allStudents.length==0){
            return;
        }
        this.allStudents=[];
        this.studentData.students=[];
        this.flashMessages.success('Deleted All Student Data');
    }

    @action
    deleteStudent(student){
        this.allStudents=this.allStudents.filter((s)=>s.id!==student.id);
        this.studentData.students=this.studentData.students.filter((s)=>s.id!==student.id);
        this.flashMessages.success(`Successfully Deleted Student ${student.name} Data`);
        this.hasMore=this.page<this.allStudents.length;
    }

    @action
    addStudent(){
        this.router.transitionTo('student.add');
    }

    @action
    updateColumn(selected){
        this.selectedColumns=selected;
        console.log('Searching');
        this.searchText.perform();
    }
}

