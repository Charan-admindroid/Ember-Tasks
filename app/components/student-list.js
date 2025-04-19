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
    @tracked isSort=false;
    @tracked sortField=null;

    @tracked tableColumns=["S.No","Roll No","Name","Department","DOB","Interests","Address","Action"];
    @tracked sortable=['id','rollno','name','dept','dob','interests','address','action'];

    @tracked columns=["rollno","name","dept","address","interests"];
    @tracked selectedColumns=[];

    get Students() {
        let students = [...this.allStudents];
        console.log("Get Students");
        if (this.isSort) {
            if(this.sortField==='id'||this.sortField==='action'){
                return students;
            }
            if(this.sortField==="interests"){
                students=[...students].sort((a,b)=>{
                    let aJoin=a.interests.join(',')
                    console.log(aJoin);
                    let bJoin=b.interests.join(',')
                    console.log(bJoin);
                    return aJoin.localeCompare(bJoin);
                })
            }
            else if(this.isSort==='dob'){
                students=[...students].sort((a,b)=>{
                    let aDate=new Date(a.dob);
                    let bDate=new Date(b.dob);
                    return aDate.localeCompare(bDate);
                })
            }
            else{
                students = [...students].sort((a, b) => a[this.sortField].localeCompare(b[this.sortField]));
            }
        }
      
        console.log(students);
        return students.slice(0, this.currentPage * this.page);
      }
      

    constructor(){
        super(...arguments);
        this.loadInitial.perform();
    }

    @action
    columnSort(index){
        console.log("this.sort",this.isSort);
        this.isSort=!this.isSort;
        this.sortField=this.sortable[index];
        console.log(this.sortField);
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
                if(this.selectedColumns.length==0){
                    return(
                        student.name.toLowerCase().includes(this.search.toLowerCase())||
                        student.rollno.includes(this.search)||
                        student.dept.toLowerCase().includes(this.search.toLowerCase())||
                        student.address.toLowerCase().includes(this.search.toLowerCase())
                    )
                }else{
                    return this.selectedColumns.some((col) => {
                        let value = student[col];
                        if (value == null) {
                            return false;
                        }else{
                            return String(value).toLowerCase().includes(this.search.toLowerCase());
                        }
                    });
                }
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

