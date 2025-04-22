/* eslint-disable prettier/prettier */
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import {action} from '@ember/object';
import {inject as service} from '@ember/service';
export default class WordTyping extends Component{
    @tracked characters='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    @tracked word="Hello have a nice day!";
    @tracked length=3;
    @tracked value="";
    @tracked correct=false;
    @tracked lifes=3;
    @tracked level=0;
    @service flashMessages
    @tracked isStarted=false;
    @tracked highestScore=0;
    @tracked timer=0;
    intervalId = null;
    maxTime = 300;
    @tracked count=0;

    @action
    start(){
        if(this.isStarted===false){
            this.isStarted=true;
            this.generateRandom(this.length);
            this.startTimer();
        }
    }

    get minutes() {
        return Math.floor(this.timer / 60).toString().padStart(2, '0');
    }

    get seconds() {
        return (this.timer % 60).toString().padStart(2, '0');
    }

    @action
    generateRandom(length){
        let char='';
        for(let i=0;i<length;i++){
            char+=this.characters.charAt(Math.floor(Math.random()*this.characters.length));
            console.log("word",char);
        }
        this.word=char;
       console.log(this.word);
    }

    @action
    startTimer() {
      if (this.intervalId) return;
  
      this.intervalId = setInterval(() => {
        if (this.timer < this.maxTime) {
          this.timer++;
        }
        else {
          clearInterval(this.intervalId);
          this.gameOver();
          this.flashMessages.danger("Your Time's up")
        }
      }, 1000);
      if(this.timer%60){
        this.count++;
        this.flashMessages.warning(`${this.count} min completed`)
      }
    }
  
    @action
    resetTimer() {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.timer = 0;
    }


    @action
    gameOver(){
        this.correct=false;
        this.flashMessages.danger(`Game over! your score is Level: ${this.level}. Press Enter to Start Again`);
        this.length=3;
        if(this.highestScore<this.level){
            this.highestScore=this.level;
        }
        this.level=0;
        this.value="";
        this.lifes=3;
        this.resetTimer();
        this.word="Hello have a nice day!";
        this.isStarted=false;
    }

    @action
    updateWord(e){
        this.value=e.target.value;
        console.log("value",this.value);
        for(let i=0;i<this.value.length;i++){
            if(this.value[i]===this.word[i]){
                console.log('Correct');
                this.correct=true;
            }else{
                console.log("Wrong");
                this.lifes--;
                if(this.lifes===0){
                    this.gameOver();
                }else{
                    this.flashMessages.warning(`Only ${this.lifes} left`);
                    this.value=this.value.slice(0,this.value.length-1);
                }
            }
        }
        if(this.correct && (this.value.length===this.word.length)){
            this.flashMessages.success("Correct");
            this.generateRandom(++this.length);
            this.correct=false;
            this.value="";
            this.level++;
        }
        
    } 
}