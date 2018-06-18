import { Injectable } from '@angular/core';
import { PROBLEMS } from '../mock-problem';
import { Problem } from '../models/problem.model';
import { Http, Response, Headers } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private problemsSource = new BehaviorSubject<Problem[]>([]);

  constructor(private http: Http) { }

  getProblems(): Observable<Problem[]> {
    this.http.get("api/v1/problems")
      .toPromise()
      .then((res: Response) => {
        this.problemsSource.next(res.json());
      })
      .catch(this.handleError);

    return this.problemsSource.asObservable();
  }

  getProblem(id: number): Promise<Problem> {
    return this.http.get(`api/v1/problems/${id}`)
                      .toPromise()
                      .then((res: Response) => res.json())
                      .catch(this.handleError);
  }

  addProblem(problem: Problem): Promise<Problem> {
    let options = {
      headers: new Headers({'content-type': 'application/json'})
    }
    return this.http.post('/api/v1/problems', problem, options)
      .toPromise()
      .then((res: Response) => {
        this.getProblems(); // refresh problem list.
        return res.json();
      })
      .catch(this.handleError);
  }

  buildAndRun(data): Promise<Object> {
    let options = {
      headers: new Headers({'content-type': 'application/json'})
    }
    return this.http.post('/api/v1/build_and_run', data, options)
      .toPromise()
      .then((res: Response) => {
        this.getProblems(); // refresh problem list.
        return res.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.body || error);
  }
}
