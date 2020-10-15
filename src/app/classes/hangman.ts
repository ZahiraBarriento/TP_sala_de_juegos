export class Hangman {

    guion: string = "";
    countError: number;
    gameOver: boolean = false;
    wordSecret: string;
    letterError : any = [];
    countSuccess : number = 0;
    resultado : string;

    constructor() {

    }

    getWordChoice(): string {
        const choices = ["CASA", "PERRO", "COCHE", "ESTUDIO", "COMIDA", "TECLADO"];
        const randomChoice = Math.floor(Math.random() * choices.length);
        this.wordSecret = choices[randomChoice];
        console.log(this.wordSecret)

        for (let index = 0; index < this.wordSecret.length; index++) {
            this.guion += '_';
        }

        return choices[randomChoice];
    }

    game(button : {letter: string, state: string}) : boolean {

        let win : boolean = false;

        if (!this.correct(button.letter)) {
            if(this.countError < 5){
                this.error(button.letter);
            }else {
                this.guion = this.wordSecret;
                this.resultado = "PERDIO";
                this.countError++;
            }
            button.state = "button-error";
        }else{
            if(this.countSuccess == this.wordSecret.length){
                this.resultado = "GANO";
                win = true;
            }
            button.state = "button-success";
        }

        return win;
    }

    correct(letter): boolean {
        let success: boolean = false;
        let len = this.wordSecret.length;

        for (let index = 0; index < len; index++) {
            if (letter == this.wordSecret[index]) {
                this.guion =
                (index == 0 ? "" : this.guion.substr(0, index)) +
                    letter +
                    this.guion.substr(index + 1);
                success = true;
                this.countSuccess ++;
            }
        }

        return success;
    }

    error(letter) {
        this.letterError.push(letter);
        this.countError ++;
        console.log(this.countError)
    }
}
