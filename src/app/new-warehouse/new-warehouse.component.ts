import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Warehouse } from '../DTOs/Warehouse';
import { WarehouseService } from '../services/warehouse.service';
import '@angular/localize/init';
import { Alert } from '../_shared/alert-interface';

@Component({
  selector: 'app-new-warehouse',
  templateUrl: './new-warehouse.component.html',
  styleUrls: ['./new-warehouse.component.css']
})
export class NewWarehouseComponent implements OnInit {
  warehouseForm!: FormGroup
  alerts: Alert[] = [];
  constructor(private formBuilder: FormBuilder, private warehouseService: WarehouseService) {

  }
  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
    this.warehouseForm = this.formBuilder.group({
      txtWarehouseManager: ['', Validators.required],
      txtLocation: ['', Validators.required],
      ddlStatus: ['', Validators.required],
      txtCapacity: ['', Validators.compose([Validators.required, Validators.min(1)])]


    })
  }
  // addwarehouse2() {
  //   debugger
  //   var warehouse = new Warehouse();
  //   warehouse.warehouseManager = this.warehouseForm.value["txtWarehouseManager"];
  //   warehouse.location = this.warehouseForm.value["txtLocation"];

  //   if (this.warehouseForm.value["ddlStatus"] == "true")
  //     warehouse.status = true;
  //   else
  //     warehouse.status = false
  //   // warehouse.capacity = 25
  //   warehouse.capacity = this.warehouseForm.value["txtCapacity"];

  //   // warehouse.warehouseManager = "xxxxx";
  //   // warehouse.location = "sdds";
  //   // warehouse.status = true;
  //   // warehouse.capacity = 25;

  //   this.warehouseService.Insert(warehouse).subscribe({
  //     next: u => console.log("ok"),
  //     error: e => console.log(e)
  //   }

  //   );
  // }
  addWarehouse() {
    debugger
    if (this.warehouseForm.valid) {
      var warehouse = new Warehouse();
      warehouse.warehouseManager = this.warehouseForm.value["txtWarehouseManager"];
      warehouse.location = this.warehouseForm.value["txtLocation"];

      if (this.warehouseForm.value["ddlStatus"] == "true") { warehouse.status = true; }
      else { warehouse.status = false; }

      warehouse.capacity = this.warehouseForm.value["txtCapacity"];
      this.warehouseService.Insert(warehouse).subscribe({
        next: () => {
          this.alerts.push({
            type: 'success',
            message: "Warehouse Added successfully"
          })
          this.resetForm();
          this.closeAlertAfterDelay();
        },
        error: () => {
          this.alerts.push({
            type: 'danger',
            message: "Error happened"
          })
          this.closeAlertAfterDelay();
        }
      });
    }
  }

  closeAlertAfterDelay() {
    const alertIndex = this.alerts.length - 1;
    setTimeout(() => {
      this.close(this.alerts[alertIndex]);
    }, 5000);
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  resetForm() {
    this.warehouseForm.reset({
      txtWarehouseManager: '',
      txtLocation: '',
      ddlStatus: '',
      txtCapacity: ''
    });
  }
}
