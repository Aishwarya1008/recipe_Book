import * as firebase from 'firebase';
import { Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  token = '';
  constructor (private router: Router) {}
  signUp(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => console.log(error));
  }
  signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((response) => { console.log(response);
                                      this.router.navigate(['recipe']);
                                      response.user.getIdToken(true).then((token) => {
                                        localStorage.setItem('userToken', token);
                                      }); })
      .catch(error => console.log(error));
  }
  getToken() {
    this.token = localStorage.getItem('userToken');
    console.log(this.token);
    return this.token;
  }
  logOut() {
    localStorage.clear();
  }
  isAuthenticated() {
    this.token = localStorage.getItem('userToken');
    return this.token !== null;
  }
}
