import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/users';
import { UserAccountsService } from '../../services/user-accounts.service';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css']
})
export class RegisteredUsersComponent implements OnInit {

  users$: Observable<User[]>= this.userAccountsSvc.all();
  displayArchived$: Observable<boolean> = this.userAccountsSvc.displayArchived;
  constructor(private userAccountsSvc: UserAccountsService) { }

  ngOnInit(): void {

  }

  toggleUserArchive(user: User){
    this.userAccountsSvc.toggleArchive(user);
  }

  toggleArchivedUserDisplay(){
    this.userAccountsSvc.toggleArchivedDisplay();
  }

 

 
}
