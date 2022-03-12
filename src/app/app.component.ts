import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";



@Injectable()

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private readonly fireStore: AngularFirestore) {
    
   }
  ngOnInit(): void {
  }


  title = 'csgoForum';


 async addUserToDb(){
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      firebase.database().ref('registered_users/' + user.displayName).set(user.uid);
      console.log(firebase.database().ref('registered_users/' + user.displayName).get());

    } else {
    }
  });
  }
   

  signIn(user: string) {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(googleAuthProvider);
  }



  signOut() {
    this.afAuth.signOut();
  }
}
