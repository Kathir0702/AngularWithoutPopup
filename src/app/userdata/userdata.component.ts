import { Component, OnInit } from '@angular/core';
import { UserDataServiceService } from '../Services/user-data-service.service';
import { CustomAlertService } from '../Shared/custom-alert.service';
import { FilterPipe } from '../Shared/filter.pipe';
import { OrderPipe } from 'ngx-order-pipe';
@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {
  userDataList = [];
  sortedCollection = [];
  ListBackground = "#e6e9ef";
  public addButtonName: any;
  searchKey: string;
  public expression: string = 'FirstName';
  order: string = 'FirstName';
  reverse: boolean = false;
  constructor(private userDataService: UserDataServiceService, private customAlert: CustomAlertService, private orderPipe: OrderPipe) {
   }
getDefaultSort(){
  this.sortedCollection = this.orderPipe.transform(this.userDataList, 'FirstName');
    console.log(this.sortedCollection);
}
  ngOnInit() {
    this.loadUserDataList();
  }
  loadUserDataList() {
    this.userDataService.getUserDetails().subscribe(data => {
      this.userDataList = data;
      this.getDefaultSort();
    });
    this.addButtonName = "Add";
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
  onSubmit() {
    if (this.userDataService.form.valid) {
      this.userDataService.insertUpdateUserData(this.userDataService.form.value)
        .subscribe(
        result => {
          this.clearData();
          this.loadUserDataList();
          this.customAlert.successMessage('Submitted successfully');
        },
        error => this.customAlert.warningMessage(error)
        );
    }
  }
  onEdit(row) {
    this.userDataService.SetFormValue(row);
    this.addButtonName = "Update";
  }
  onDelete(row) {
    if (confirm("Are you sure want to delete this User Data?")) {
      this.userDataService.SetFormValue(row);
      this.userDataService.deleteUser(this.userDataService.form.value)
        .subscribe(
        result => {
          this.clearData();
          this.loadUserDataList();
          this.customAlert.warningMessage("Deleted Successfully!");
        },
        error => console.error(error)
        );
    }
  }
  clearData() {
    this.userDataService.form.reset();
    this.userDataService.ClearForm();
    this.addButtonName = "Add";
  }
}
