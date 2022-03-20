import { Component, OnInit } from '@angular/core';
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { IForum, IOtazkaData } from './IForum';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { IKomentar } from './Ikomentar';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AngularFireStorage } from '@angular/fire/storage';








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
  otazky: IForum[] = [];
  counter = 0;
  avatar2: any;
 
  

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private readonly fireStore: AngularFirestore,  private afStorage: AngularFireStorage){
    this.afAuth.authState.subscribe(user =>{
      if(user) this.userId = user.uid, this.username = user.displayName;
  })
  }

  async getOtazka(document: QueryDocumentSnapshot<IOtazkaData>): Promise<IForum> {
    const komentare = (await document.ref.collection("komentare").get()).docs.map(k => k.data()) as Array<IKomentar>
    return {
      id: document.id, komentare: komentare , username: this.username , nadpis: document.data().nadpis, obsah: document.data().obsah

    }
  }


  ngOnInit(): void {
    const post = this.fireStore.collection<IForum>("Forum")
    post.get().subscribe(d => this.post = d.docs.map((c: { data: () => any; }) => c.data()))


    const otazky = this.fireStore.collection<IOtazkaData>("Forum")
    otazky.get().subscribe((d) => d.docs.forEach(async (c, i) => this.getOtazka(c).then(o => this.otazky = copySetArray(this.otazky, i, o))))

    console.log(this.userId)

    const ref = this.afStorage.ref('avatar/' + this.userId)
    ref.getDownloadURL().toPromise().then((avatar3: any) =>{
     this.avatar2 = avatar3;
    })
    

  }


  async vytvoritTema(nadpis: string, obsah: string, username: string) {
      const clanky = this.fireStore.collection("Forum")
      const id = this.userId;
      await clanky.add({nadpis, obsah, username, id});
      
    
      
  } 

  pridatKomentar(komentar: string, id: string) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const clanky = this.fireStore.collection("Forum").doc(id).collection("komentare").add({obsah: komentar})
      } else {
      }
    });
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
      this.fireStore.collection("Forum").get()
  }
}


function copySetArray<T>(array: T[], i: number, value: T): T[] {
  const copy = [...array];
  copy[i] = value;
  return copy;
}


