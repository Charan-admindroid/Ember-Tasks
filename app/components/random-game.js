/* eslint-disable prettier/prettier */
import { tracked } from '@glimmer/tracking';
import {action} from '@ember/object'
import Component from '@glimmer/component';
export default class GameController extends Component {
    @tracked isTrue=false;
    @tracked number=0;
    @tracked randomNumber=0;
    @tracked see=false;

    @action
    updateNumber(e){
        this.number=parseInt(e.target.value)||0;
        this.see=false;
    }

    @action
    generate(){
        this.randomNumber=Math.floor(Math.random()*100)+1;
        console.log(this.randomNumber);
        this.isTrue=true;
        this.number=0;
    }

    @action
    check(){
        this.see=true;
    }

    @action
    clear(){
        this.see=false;
        this.isTrue=false;
        this.randomNumber=0;
    }


}
