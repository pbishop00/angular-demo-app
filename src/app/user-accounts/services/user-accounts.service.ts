import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User, NewUser } from '../models/users';
@Injectable({
  providedIn: 'root'
})
export class UserAccountsService {

  //$ indicates this is a pipeline
  private users$ = new BehaviorSubject<User[]>([
    {id: 1, username: "peteb", firstName: "Peter", lastName: "Bishop", title: "Student", archived: false},
    {id: 2, username: "johnd", firstName: "John", lastName: "Doe", title: "Student", archived: false},
    {id: 3, username: "janed", firstName: "Jane", lastName: "Doe", title: "Student", archived: false},
    {id: 4, username: "samp", firstName: "Samantha", lastName: "Pear", title: "Teacher", archived: false},
  ]);
  private _displayArchived$ = new BehaviorSubject<boolean>(true);
  private _displayCount$ = new BehaviorSubject<number>(0);
  constructor() { }

  all(){
    return this.users$;
  }

  append(user: NewUser){
    
    let users = this.users$.value;
    users = [
      ...users, 
      {
        ...user, 
        id: Math.max(...users.map(u => u.id), 0) + 1,
    }
  ];

  this.users$.next(users);
  }

  toggleArchive(user: User){
    let newUsers = this.users$.value;
    let userIndex = newUsers.findIndex(u => u.id === user.id);
    let originalUser = newUsers[userIndex];
    let updUser = {
      ...originalUser,
     archived:  !originalUser.archived,
    }
    newUsers[userIndex] = updUser;
    this.users$.next(newUsers);
  }

  get displayArchived(){
    console.log("Getting value! ")
    return this._displayArchived$;
  }

  toggleArchivedDisplay(){
    console.log("Updating display");
    let oldVal = this._displayArchived$.value;
    this._displayArchived$.next(!oldVal);
    console.log(this._displayArchived$.value);
  }
  get displayCount(){
   
    if (this._displayArchived$.value){
       this._displayCount$.next(this.users$.value.length);
    }else{
       this._displayCount$.next(this.users$.value.filter(u => !u.archived).length);
    }
    return this._displayCount$;
  }
  
 
}



