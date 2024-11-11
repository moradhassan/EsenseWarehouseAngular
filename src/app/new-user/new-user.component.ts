import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Role } from '../DTOs/Role';
import { SignUp } from '../DTOs/SignUp';
import { WarehouseService } from '../services/warehouse.service';
import { Warehouse } from '../DTOs/Warehouse';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  userForm!: FormGroup
  warehouses!: Warehouse[]
  roles!: Role[]
  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private warehouseService:WarehouseService
  ) { }

  ngOnInit(): void {
    this.buildForm()
    this.loadRoles()
    this.getWarehouses()
  }

  loadRoles() {
    this.accountService.getRoles().subscribe({
      next: data => {
        debugger
        this.roles = data
      }
    })
  }

  buildForm() {
    this.userForm = this.formBuilder.group({
      txtName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]{3,}')])],
      txtUserName: ['', Validators.required],
      txtEmail: ['', Validators.compose([Validators.required, Validators.email])],
      txtPassword: ['', Validators.required],
      ddlRole: ['', Validators.required],
      ddlWarehouse: ['', Validators.required],

    })
  }

  AddUser() {
    debugger
    var user = new SignUp();
    user.name = this.userForm.value['txtName']
    user.userName = this.userForm.value['txtUserName']
    user.email = this.userForm.value['txtEmail']
    user.password = this.userForm.value['txtPassword']
    user.roleName = this.userForm.value['ddlRole']
    user.warehouseId = parseInt(this.userForm.value["ddlWarehouse"])

    this.accountService.createAccount(user).subscribe({
      next: () => {
        debugger
        Swal.fire({
          position: "center",
          icon: "success",
          title: "New User Created",
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

  getWarehouses() {
    this.warehouseService.LoadAll().subscribe({
      next: data => {
        this.warehouses = data
      }
    })
  }

  
}
