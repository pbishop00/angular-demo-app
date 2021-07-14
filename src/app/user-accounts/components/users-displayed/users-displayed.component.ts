import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { UserAccountsService } from '../../services/user-accounts.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users-displayed',
  templateUrl: './users-displayed.component.html',
  styleUrls: ['./users-displayed.component.css']
})
export class UsersDisplayedComponent implements OnInit {

  // This doesn't work!
  //displayCount$: Observable<number> = this.userAccountSvc.displayCount;

  userCount$: Observable<number> = combineLatest([
    this.userAccountsSvc.all(),
    this.userAccountsSvc.displayArchived,
  ]).pipe(map(([users, showArchived]) => {
    if (showArchived) return users.length;
    return users.filter(u => !u.archived).length;
  }));
  constructor(private userAccountsSvc: UserAccountsService) { }

  ngOnInit(): void {
  }




}
