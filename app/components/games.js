/* eslint-disable prettier/prettier */
import Component from "@glimmer/component";
import { task,timeout } from "ember-concurrency";
import { tracked } from "@glimmer/tracking";
import {inject as service} from '@ember/service';

export default class Games extends Component{
    @tracked isSimen=false;
    @tracked isRandom=false;
    @tracked isProperties=false;
    @service router;
    @tracked isTyping=false;

    @task
    *simenSays(){
        this.isSimen=true;
        yield timeout(3000);
        this.router.transitionTo('game.simen-says');
        this.isSimen=false;
    }

    @task
    *random(){
        this.isRandom=true;
        yield timeout(3000);
        this.router.transitionTo('game.random');
        this.isRandom=false;
    }

    @task
    *typing(){
        this.isTyping=true;
        yield timeout(3000);
        this.router.transitionTo('game.typing')
        this.isTyping=false;
    }
}