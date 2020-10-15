import { single } from 'rxjs/operators';

export class Tateti {

    lugares = [
        "-", "-", "-",
        "-", "-", "-",
        "-", "-", "-"
    ];
    compuSigno: string;
    resultado: string = "";
    espacio = 0;
    auxCompu: any = [];
    auxUser: any = [];
    fila_1 : any = [0, 1, 2];
    fila_2 : any = [3, 4, 5];
    fila_3 : any = [6, 7, 8];
    columna_1 : any = [0, 3, 6];
    columna_2 : any = [1, 4, 7];
    columna_3 : any = [2, 5, 8];
    diagonal_1 : any = [0, 4, 8];
    diagonal_2 : any = [2, 4, 6];

    constructor() {
    }

    game(signo) : string{
        var compu = this.playCompu();
        var user = this.playUser(signo);

        if(this.win(user, compu, this.fila_1)){
            this.resultado = "GANO";
        }else if ((this.win(user, compu, this.fila_1)) == false){
            this.resultado = "PERDIO";
        }if(this.win(user, compu, this.fila_2)){
            this.resultado = "GANO";
        }else if ((this.win(user, compu, this.fila_2)) == false){
            this.resultado = "PERDIO";
        }if(this.win(user, compu, this.fila_3)){
            this.resultado = "GANO";
        }else if ((this.win(user, compu, this.fila_3)) == false){
            this.resultado = "PERDIO";
        }

        if(this.win(user, compu, this.diagonal_1)){
            this.resultado = "GANO";
        }else if ((this.win(user, compu, this.diagonal_1)) == false){
            this.resultado = "PERDIO";
        }if(this.win(user, compu, this.diagonal_2)){
            this.resultado = "GANO";
        }else if ((this.win(user, compu, this.diagonal_2)) == false){
            this.resultado = "PERDIO";
        }

        if(this.win(user, compu, this.columna_1)){
            this.resultado = "GANO";
        }else if ((this.win(user, compu, this.columna_1)) == false){
            this.resultado = "PERDIO";
        }if(this.win(user, compu, this.columna_2)){
            this.resultado = "GANO";
        }else if ((this.win(user, compu, this.columna_2)) == false){
            this.resultado = "PERDIO";
        }if(this.win(user, compu, this.columna_3)){
            this.resultado = "GANO";
        }else if ((this.win(user, compu, this.columna_3)) == false){
            this.resultado = "PERDIO";
        }

        return this.resultado;
    }

    //verifico quien gano
    win(user : [], compu : [], campo : []): boolean{

        var win : boolean;
        var countUser = 0;
        var countCompu = 0;

        campo.forEach(function (element, i) {
            user.forEach(function (userEnter, j) {
                if (element == userEnter) { //si hay coincidencia entre los elementos
                    countUser++;//los sumo en un contador
                    if (countUser == 3) {//cuando ya hayan tres coincidencias es ta-te-ti
                        win = true;
                    }
                }
            });
            compu.forEach(compuEnter => {
                if (element == compuEnter) {
                    countCompu++;
                    if (countCompu == 3) {
                        win = false;
                    }
                }
            });
        });

        return win;
    }


    playUser(signo): any {

        var countUser = 0;
        var countCompu = 0;
        var index = this.lugares.indexOf(signo);
        var win: boolean = false;

        while (index != -1) {
            this.auxUser.push(index); //los guardo en un array
            index = this.lugares.indexOf(signo, index + 1);//coloco en un nuevo array los index de donde este x
        }
        const user = Array.from(new Set(this.auxUser)) //elimino los repetidos

        return user;
    }

    playCompu(): any {

        var countCompu = 0;
        var index = this.lugares.indexOf(this.compuSigno);

        while (index != -1) {
            this.auxCompu.push(index); //los guardo en un array
            index = this.lugares.indexOf(this.compuSigno, index + 1);//coloco en un nuevo array los index de donde este x
        }
        const compu = Array.from(new Set(this.auxCompu)) //elimino los repetidos

        return compu;
    }
}
