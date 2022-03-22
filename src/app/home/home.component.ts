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
  counter = 0;
  avatar2: any;
  date : any = new Date().toLocaleString();
  true = true;
 
  

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private readonly fireStore: AngularFirestore,  private afStorage: AngularFireStorage){
    this.afAuth.authState.subscribe(user =>{
      if(user) this.userId = user.uid, this.username = user.displayName;
  })
  }

  async getPrispevek(document: QueryDocumentSnapshot<IOtazkaData>): Promise<IForum> {
    const komentare = (await document.ref.collection("komentare").get()).docs.map(k => k.data()) as Array<IKomentar>
    return {
      id: document.id, komentare: komentare , username: document.data().username  , user_id : document.data().id , date: document.data().date , nadpis: document.data().nadpis, obsah: document.data().obsah
      }
  }



  ngOnInit(): void {
    const prispevky = this.fireStore.collection<IOtazkaData>("Forum")
    prispevky.get().subscribe((d) => d.docs.forEach(async (c, i) => this.getPrispevek(c).then(o => this.post = copyArray(this.post, i, o))))
  }


  async vytvoritPrispevek(nadpis: string, obsah: string, username: string, date: Date) {
      const clanky = this.fireStore.collection("Forum")
      const id = this.userId;
      await clanky.add({nadpis, obsah, username, id, date});
      
    
      
  } 

  pridatKomentar(komentar: string, id: string, username: string, date : Date) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const clanky = this.fireStore.collection("Forum").doc(id).collection("komentare").add({
          obsah: komentar,
          User_id : user.uid,
          username : user.displayName,
          date: this.date
        })
      } else {
      }
    });
  }
}

function copyArray<T>(array: T[], i: number, value: T): T[] {
  const copy = [...array];
  copy[i] = value;
  return copy;
}


