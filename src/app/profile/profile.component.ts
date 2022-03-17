import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { async, inject } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFileUploaderModule } from "angular-file-uploader";
import firebase from 'firebase/app';
import {ImageService} from '../imageService';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { AngularFireStorage, createStorageRef, GetDownloadURLPipe } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';




@Injectable()



@Component({
  selector: 'app-profile',
  providers: [ImageService],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent implements OnInit {





  constructor(afAuth: AngularFireAuth, private http: HttpClient, private afStorage: AngularFireStorage){
    
  }

 


  aboutMeText: string;
  ability: string;
  role: any;
  faceitLvl: any;
  mmrank: any;
  goal: any;  
  vyberRanku: '';
  hours: number;
  age: number;
  achievement: string;
  urlFaceit: any;
  urlEsea: any;
  urlSteam: any;
  file: File;
  avatar: any;
  img: null;
  username: string;
  avatar2: any;
  edit: boolean;
  edit2: boolean;
  editA: boolean;
  email: string;



  addLinks(){
    this.edit = true;
  }

  addSheets(){
    this.edit2 = true;
  }

  editAvatar(){
    this.editA = true;
  }

  saveLinks(){
    localStorage.setItem("esea", this.urlEsea);
    localStorage.setItem("faceit", this.urlFaceit);
    localStorage.setItem("steam", this.urlSteam);
    this.edit = false;
  }

  submitNumber(event: number){
  }

  getUsername(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.username = user.displayName;
        console.log(user.uid);
      } else {
      }
    });
  }


  submitAny(event: any){
    console.log(event);
  }

  saveToLS(){
    localStorage.setItem("achievement", this.achievement);
    localStorage.setItem("goal", this.goal);
    localStorage.setItem("age", JSON.stringify(this.age));
    localStorage.setItem("rank", this.mmrank);
    localStorage.setItem("faceitLevel", this.faceitLvl);
    localStorage.setItem("hours", JSON.stringify(this.hours));
    localStorage.setItem("role", this.role);
    localStorage.setItem("ability", this.ability);
    localStorage.setItem("aboutMe", this.aboutMeText);
    this.edit2 = false;
  }

  saveToDb(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.updateProfile
        firebase.database().ref('users/' + user.displayName + '/achievement').set(this.achievement);
        firebase.database().ref('users/' + user.uid + '/goal').set(this.goal);
        firebase.database().ref('users/' + user.uid + '/age').set(this.age);
        firebase.database().ref('users/' + user.uid + '/esea').set(this.urlEsea);
        firebase.database().ref('users/' + user.uid + '/faceitUrl').set(this.urlFaceit);
        firebase.database().ref('users/' + user.uid + '/steam').set(this.urlSteam);
        firebase.database().ref('users/' + user.uid + '/rank').set(localStorage.getItem("rank"));
        firebase.database().ref('users/' + user.uid + '/faceitLevel').set(this.faceitLvl);
        firebase.database().ref('users/' + user.uid + '/hours').set(this.hours);
        firebase.database().ref('users/' + user.uid + '/role').set(this.role);
        firebase.database().ref('users/' + user.uid + '/ability').set(this.ability);
        firebase.database().ref('users/' + user.uid + '/aboutMe').set(this.aboutMeText);
      } else {
      }
    });
  }

  getValue(event: Event): any {
    return (event.target as HTMLInputElement).value;
  }

  getBlank(string: any){
    if(string){
      return string;
    }
    return ' ';
  }


  // uploadAvatar(){
    //firebase.auth().onAuthStateChanged((user) => {
    //firebase.storage().ref('users/' + user.uid + '/profile.jpg').put(this.file).then(function () {
      //console.log("succesfully uploaded")
    //}) 
    //});
 // }

 uploadAvatar(){
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
     this.afStorage.ref('avatar/' + user.displayName).put(this.avatar);
    } else {
    }
  });
 
 }

 getAvatar(){
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
     const ref = this.afStorage.ref('avatar/' + user.displayName)
     ref.getDownloadURL().toPromise().then((avatar3: any) =>{
      this.avatar2 = avatar3;
      this.editA = false;
     })
    } else {
    }
  });
  }


  getUserData(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User logged in already or has just logged in.
        console.log(user.uid);
      } else {
        // User not logged in or has just logged out.
      }
    });
  }

  onFileSelected(event){
    this.avatar = event.target.files[0];
    
  }

  ngOnInit(): void {
    this.achievement = this.getBlank(localStorage.getItem("achievement"));
    this.goal = this.getBlank(localStorage.getItem("goal"));
    this.age = this.getBlank(JSON.parse(localStorage.getItem("age")));
    this.urlEsea = this.getBlank(localStorage.getItem("esea"));
    this.urlFaceit = this.getBlank(localStorage.getItem("faceit"));
    this.urlSteam = this.getBlank(localStorage.getItem("steam"));
    this.mmrank = this.getBlank(localStorage.getItem("rank"));
    this.faceitLvl = this.getBlank(localStorage.getItem("faceitLevel"));
    this.hours = this.getBlank(JSON.parse(localStorage.getItem("hours")));
    this.role = this.getBlank(localStorage.getItem("role"));
    this.ability = this.getBlank(localStorage.getItem("ability"));
    this.aboutMeText = this.getBlank(localStorage.getItem("aboutMe"));
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.username = user.displayName;
        this.email = user.email;
        const ref = this.afStorage.ref('avatar/' + user.displayName)
        ref.getDownloadURL().toPromise().then((avatar3: any) =>{
          this.avatar2 = avatar3;
          this.editA = false;
         })
      } else {
      }
    });

  }
}
