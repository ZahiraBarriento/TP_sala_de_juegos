export class ArithmeticAgility {

    public num1: number;
    public num2: number;
    public numEnter: number;
    public count: number = 0;
    public success: number = 0;
    public result: number;
    public operator: any;
    public cuenta: any;
    public signo : any;

    constructor() {

    }

    public game() {
        this.num1 = Math.floor((Math.random() * 10) + 1);
        this.num2 = Math.floor((Math.random() * 10) + 1);
        this.signo = Math.floor((Math.random() * 4) + 1);

        switch (this.signo) {
            case 1:
                this.operator = "+";
                break;
            case 2:
                this.operator = "-";
                break;
            case 3:
                this.operator = "*";
                break;
            case 4:
                this.operator = "/";
                break;
            default:
                break;
        }

        switch (this.operator) {
            case "+":
                this.result = this.num1 + this.num2;
                break;
            case "-":
                this.result = this.num1 - this.num2;
                break;
            case "*":
                this.result = this.num1 * this.num2;
                break;
            case "/":
                this.result = this.num1 / this.num2;
                break;
            default:
                break;
        }
    }

    public checkGame() {
        if (this.numEnter == this.result && this.count < 5) {
            this.success++;
            this.count++;
        }
        else if (this.count < 5){
            this.count++;
        }
    }
}
