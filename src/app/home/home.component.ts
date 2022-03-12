import { Component, OnInit } from '@angular/core';
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { IForum } from './IForum';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { IComments } from './IComments';








@Injectable()

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {  
  userId: string;
  username: string;
  body: string;
  post: IForum[] = [];
  currentUser: string;
  comment: IComments[] = [];
  counter = 0;

 
  

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private readonly fireStore: AngularFirestore){
    this.afAuth.authState.subscribe(user =>{
      if(user) this.userId = user.uid, this.username = user.displayName;
  })
  }


  ngOnInit(): void {
    const post = this.fireStore.collection<IForum>("Forum")
    post.get().subscribe(d => this.post = d.docs.map((c: { data: () => any; }) => c.data()))
   
    
    const comment = this.fireStore.collection<IComments>("Komentare")
    comment.get().subscribe(d => this.comment = d.docs.map((c: { data: () => any; }) => c.data()))

  }


  async vytvoritTema(nadpis: string, obsah: string, username: string) {
      const clanky = this.fireStore.collection("Forum")
      const id = this.userId;
      await clanky.add({nadpis, obsah, username, id});
      
    
      
  } 
  async addComment(comment: string, username: string){
    const comments = this.fireStore.collection("Komentare")
    await comments.add({comment, username});
  }

  getUsername(){
    const firebaseRef = firebase.database().ref("Forum");
    firebaseRef.once("value", function(snapshot){
      snapshot.forEach(function(element){
        console.log(element.val());
      })
    })
  }


  liked(){
    const element = document.getElementById("like");
    element.classList.toggle("liked");
    if (this.userId ) {
      this.counter++;
    }
  }

  getUserId(){
  }
}
