/* eslint-disable prettier/prettier */
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import {action} from '@ember/object';
import { task,timeout } from 'ember-concurrency';
import {inject as service} from '@ember/service';

export default class SimenSays extends Component{
    @tracked btns=["blue","green","orange","red"];
    @tracked gameSeq=[];
    @tracked userSeq=[];
    @tracked isTrue=null;
    @tracked h3=document.querySelector('h3');
    @tracked started=false;
    @tracked level=0;
    @tracked wrong=false;
    @service flashMessages;

    get activeBoxBlue(){
        return this.isTrue==='blue'
    }
    get activeBoxRed(){
        return this.isTrue==='red'
    }
    get activeBoxGreen(){
        return this.isTrue==='green'
    }
    get activeBoxOrange(){
        return this.isTrue==='orange'
    }

    get activeBoxWrong(){
        return this.isTrue==='white';
    }

    @action
    start(){
        if(this.started===false){
            this.started=true;
            this.initialBox.perform();
        }  
    }

    
    @task
    *color(attr){
        this.isTrue=attr;
        this.userSeq.push(this.isTrue);
        console.log("UserSeq",this.userSeq);
        yield timeout(300);
        this.isTrue=null;
        this.checkAns.perform(this.userSeq.length-1);
    }

    @task
    *initialBox(){
        this.userSeq=[];
        this.level++;
        this.flashMessages.success(`Level ${this.level}`)
        this.isTrue=this.btns[Math.floor(Math.random()*4)];
        this.gameSeq.push(this.isTrue);
        console.log("Game Seq",this.gameSeq);
        yield timeout(300);
        this.isTrue=null; 
    }

    @task
    *checkAns(idx){
        if(this.userSeq[idx]===this.gameSeq[idx]){
            if(this.userSeq.length===this.gameSeq.length){
                yield timeout(500);
                this.initialBox.perform();
            }
        }else{
            console.log("Game Over");
            this.wrong=true;
            this.h3.innerText="Game Over, Press any key to start game again";
            this.flashMessages.danger(`Game Over! you reached Level ${this.level}. Press any key to start again`);
            this.reset.perform();
        }
    }

    @task
    *reset(){
        this.userSeq=[];
        this.gameSeq=[];
        yield timeout(300);
        this.wrong=false;
        this.isTrue=null;
        this.started=false;
        this.level=0;
    }
}