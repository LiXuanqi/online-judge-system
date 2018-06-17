import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  private inputSubject$ = new BehaviorSubject<string>('');

  constructor() { }

  // setter
  changeInput(term) {
    this.inputSubject$.next(term);
  }

  // getter
  getInput(): Observable<string> {
    return this.inputSubject$.asObservable(); // don't transfer the reference, it is not safe!
  }

}
