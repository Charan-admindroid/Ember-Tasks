/* eslint-disable prettier/prettier */
import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default class StudentEditRoute extends Route {
    @service studentData;
    model(params){
        return this.studentData.students.find((student)=>student.id===parseInt(params.id));
    }
}
