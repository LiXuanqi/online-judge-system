import { Component, OnInit, Inject } from '@angular/core';
import { Problem } from 'src/app/models/problem.model';

const DEFAULT_PROBLEM: Problem = Object.freeze({
  id: 0,
  name: "",
  desc: "",
  difficulty: "Easy",
  acceptance: 0
});

@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.css']
})
export class NewProblemComponent implements OnInit {

  public difficulties: string[] = ["Easy", "Medium", "Hard"];

  newProblem: Problem = Object.assign({}, DEFAULT_PROBLEM);

  constructor(@Inject('data') private data) { }

  ngOnInit() {
  }

  addProblem(): void {
    this.data.addProblem(this.newProblem)
                .catch(error => console.log(error.body));
    this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
  }

}
