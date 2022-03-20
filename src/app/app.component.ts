import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';
import { Injectable } from "@angular/core";



@Injectable()

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) {
   }

  ngOnInit(): void {
  }


  title = 'csgoForum';


 async addUserToDb(){
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      firebase.database().ref('registered_users/' + user.displayName).set(user.uid);
    } else {
    }
  });
  }
   

  signIn() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(googleAuthProvider);
  }



  signOut() {
    this.afAuth.signOut();
  }
}
