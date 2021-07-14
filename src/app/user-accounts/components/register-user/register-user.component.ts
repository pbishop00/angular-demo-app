//Component stateful logic

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder }   from '@angular/forms';
import { NewUser } from '../../models/users';
import { UserAccountsService } from '../../services/user-accounts.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {



  //component state data
  registerUserForm!: FormGroup;
  

  constructor(private fb: FormBuilder, 
    private userAccountsSvc: UserAccountsService) { }

  ngOnInit(): void {
    this.registerUserForm = this.fb.group({
      username: '',
      firstName: '',
      lastName: '',
      title: '',
      
    });
  }

  //initiate changes to the stateful data
  doRegisterUser(){
    this.userAccountsSvc.append(
      this.registerUserForm.value as NewUser);
  }

}
