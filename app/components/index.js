/* eslint-disable prettier/prettier */
import Component from "@glimmer/component";
import {inject as service} from '@ember/service';
import { tracked } from "@glimmer/tracking";
import { task,timeout } from "ember-concurrency";

export default class Index extends Component{
    @tracked isStudents=false;
    @tracked isGame=false;
    @tracked isProperties=false;
    @service router;

    @task
    *students(){
        this.isStudents=true;
        yield timeout(3000);
        this.router.transitionTo('student');
        this.isStudents=false;
    }

    @task
    *game(){
        this.isGame=true;
        yield timeout(3000);
        this.router.transitionTo('game');
        this.Game=false;
    }

    @task
    *properties(){
        this.isProperties=true;
        yield timeout(3000);
        this.router.transitionTo('properties');
        this.isProperties=false;
    }
}