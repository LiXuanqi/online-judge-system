import { Component, OnInit, Inject } from '@angular/core';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;
  isAlertVisible: boolean = false;

  constructor(@Inject('auth') private auth) { }

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }

  public closeAlert() {
    this.isAlertVisible = false;
  }

  public resetPassword() {
    this.auth.resetPassword()
      .then((res: Response) => {
        console.log(res);
        this.isAlertVisible = true;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.body || error);
  }

}
