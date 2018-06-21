import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title: string = "DailyCode";
  username: string = "LEE";

  searchBox: FormControl = new FormControl();
  subscription: Subscription;

  constructor(
    @Inject("auth") private auth,
    @Inject("input") private input,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.searchBox
                              .valueChanges
                              .pipe(debounceTime(200))
                              .subscribe(
                                term => {
                                  this.input.changeInput(term);
                                }
                              );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchProblem() {
    this.router.navigate(['/problems']);
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

}
