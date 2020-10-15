import { utf8Encode } from '@angular/compiler/src/util';
import { ignoreElements } from 'rxjs/operators';

export class GuessNumber {

    numSecret: number = 0;
    win : boolean = false;

    constructor() {
        this.getNumberRandom()
    }

    public getNumberRandom() {
        this.numSecret = Math.floor((Math.random() * 100) + 1);
        console.log("El numero secreto es: " + this.numSecret);
    }

    public game(userNum) {
        
        if(userNum == this.numSecret){
            this.win = true;
        }else{
            this.win = false;
        }

        return this.win;
    }

    public help(userNum) : string {
        var message : string;

        if (userNum > this.numSecret) {
            message = "¡Te pasaste!"
        } else {
            message = "¡Te falta!"
        }

        return message;
    }
}
