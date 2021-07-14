import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterUserComponent } from './components/register-user/register-user.component';
import { RegisteredUsersComponent } from './components/registered-users/registered-users.component';
import { UsersDisplayedComponent } from './components/users-displayed/users-displayed.component';



@NgModule({
  declarations: [
    RegisterUserComponent,
    RegisteredUsersComponent,
    UsersDisplayedComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    RegisterUserComponent,
    RegisteredUsersComponent,
    UsersDisplayedComponent,
  ],
})
export class UserAccountsModule { }
