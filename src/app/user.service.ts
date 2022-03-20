import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor() { }

  getHeroes(): Observable<User[]> {
    const users = of(USERS);
    return users;
  }
}

