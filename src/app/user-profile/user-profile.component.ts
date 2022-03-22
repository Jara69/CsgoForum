import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';




@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  aboutMeText: any;
  ability: any;
  role: any;
  faceitLvl: any;
  mmrank: any;
  goal: any;  
  vyberRanku: any;
  hours: any;
  age: any;
  achievement: any
  urlFaceit: any;
  urlEsea: any;
  urlSteam: any;
  username: any;
  avatar2: any;

  userid: any;

  id: string;

  data: AngularFireList<any>;


  constructor(private db: AngularFireDatabase,  private route: ActivatedRoute, private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userid = id;

    this.getAvatar()
    

    this.db.object("/users/" + id  + "/goal").valueChanges().subscribe(details => {
      this.goal = details;

    })

    this.db.object("/users/" + id  + "/ability").valueChanges().subscribe(details => {
      this.ability = details;
    })

    this.db.object("/users/" + id  + "/aboutMe").valueChanges().subscribe(details => {
      this.aboutMeText = details;
    })

    this.db.object("/users/" + id  + "/achievement").valueChanges().subscribe(details => {
      this.achievement = details;
    })

    this.db.object("/users/" + id  + "/age").valueChanges().subscribe(details => {
      this.age = details;
    })

    this.db.object("/users/" + id  + "/esea").valueChanges().subscribe(details => {
      this.urlEsea = details;
    })

    this.db.object("/users/" + id  + "/faceitLevel").valueChanges().subscribe(details => {
      this.faceitLvl = details;
    })

    this.db.object("/users/" + id  + "/faceitUrl").valueChanges().subscribe(details => {
      this.urlFaceit = details;
    })

    this.db.object("/users/" + id  + "/hours").valueChanges().subscribe(details => {
      this.hours = details;
    })

    this.db.object("/users/" + id  + "/rank").valueChanges().subscribe(details => {
      this.vyberRanku = details;
    })

    this.db.object("/users/" + id  + "/role").valueChanges().subscribe(details => {
      this.role = details;
    })

    this.db.object("/users/" + id  + "/steam").valueChanges().subscribe(details => {
      this.urlSteam = details;
    })

    this.db.object("/users/" + id  + "/username").valueChanges().subscribe(details => {
      this.username = details;
    })
  }

  getAvatar(){
    const ref = this.afStorage.ref('avatar/' + this.userid)
    ref.getDownloadURL().toPromise().then((avatar3: any) =>{
     this.avatar2 = avatar3;
    })
    }
  }
  


