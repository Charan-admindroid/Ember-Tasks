/* eslint-disable prettier/prettier */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class StudentRoute extends Route {
    @service studentData;
    async model(){
        if(this.studentData.students.length==0){
            await this.studentData.loadStudents();
        }
        return this.studentData;
    }
}
