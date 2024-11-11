import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {

  constructor(private router:Router){

  }
  navigateToNewUser(){
    this.router.navigate(['Home/NewUser'])

  }
}
