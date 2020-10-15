export class Anagram {

    public arrayWords : string[] = ["MUSICA","AVION","PROGRAMACION","HABITACION","CARAMELO","PERSONAJES","ANTEOJOS","CAMINATA"];
    public wordDes : string = "";
    public wordOrd : string;
    public result : string;

    constructor()
    {
    }

    public generateWord()
    {
        var number = Math.floor((Math.random() * 6) + 1);
        this.wordOrd = this.arrayWords[number];
        this.wordDes = this.wordOrd.split("").sort().join("");

        console.log(this.wordDes);

        return this.wordDes;
    }

    public game(word)
    {
        if(this.wordOrd.toLowerCase() == word.toLowerCase())
        {
            this.result = "Ganó";
        }
        else
        {
            this.result = "Perdió";
        }
    }

    public checkGame()
    {
        return this.result;
    }
}
