import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import {GeneralService} from './general.service';
import {Router} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {
  private user;
  public profileSet = false;

  constructor( private http: HttpClient,
               private snackBar: MatSnackBar,
               private generalService: GeneralService,
               private authService: AuthService ) {
    authService.getCurrentUser().then( user => this.user = user ).catch( err => console.log(err) );
  }

  setProfile( profile ){
    this.http.post('/api/profile', profile, this.generalService.getHttpOptions())
      .subscribe(res => {
          console.log('asd');
          this.profileSet = true;
      },
      error => {
        console.error(error);
        this.snackBar.open(this.generalService.formatError(error.error));
      });
  }

  getProfile(){
    return new Promise((resolve,reject) => {
      this.http.get('/api/profile', this.generalService.getHttpOptions())
        .subscribe(res => {
          resolve(res);
        },
        error => {
          console.error(error);
          this.snackBar.open(this.generalService.formatError(error.error));
          reject(error);
        });
    });
  }

  uploadPhoto(file){
    const formData = new FormData();
    formData.append('file', file);
    console.log(file, formData);
    this.http.post('api/profile/photo', formData, this.generalService.getHttpOptions())
      .subscribe(res => {
        console.log(res);
      },
      error => {
        this.generalService.resolveError(error);
      });
  }

  async getPhoto(){
    const profile: any = await this.getProfile();
    this.http.get('api/profile/photo/' + profile.photo, this.generalService.getHttpOptions())
      .subscribe(res => {
        return res;
      }, 
      err => this.generalService.resolveError(err));
  }
}
