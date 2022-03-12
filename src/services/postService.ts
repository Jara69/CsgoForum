import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";

export class Post{
    body: string;
}



@Injectable()

export class PostService{
    items: AngularFireList<Post[]> = null;
    userId: string;

    constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth){
        this.afAuth.authState.subscribe(user =>{
            if(user) this.userId = user.uid
        })
    }

    getItemsList() : AngularFireList<Post[]>{
        if(!this.userId) return;
        this.items = this.db.list(`items/${this.userId}`);
        return this.items;
    }

    createItem(item: Post){
        this.items.push(item);
    }
}