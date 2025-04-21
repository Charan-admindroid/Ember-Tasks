/* eslint-disable prettier/prettier */
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class StudentDataService extends Service {
    @tracked columns=[];
    @tracked students=[];

    async loadStudents(){
      const response=await fetch('/student_data.json');
      const data=await response.json();
      this.columns=data['columns'];
      this.students=data['students'];
      console.log(this.columns)
      console.log(this.students)
    }
}
