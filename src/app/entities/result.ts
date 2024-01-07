import { User } from "./User";
import { Quizes } from "./quizes";

export class Result {
    rid:any;
    marksGot:any;
    attempted:any;
    correctAnswers:any;
    quiz: Quizes = new Quizes;
    generateDate:any;
    user:User=new User;
}
