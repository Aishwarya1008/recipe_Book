import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  ngOnInit () {
    firebase.initializeApp({
      apiKey: 'AIzaSyA4oqHp5HF7M7W7q3LkL4NQjxipTQV65Zc',
      authDomain: 'my-recipe-book-2ea84.firebaseapp.com'
    });
  }
}
