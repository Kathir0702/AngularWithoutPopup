import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../Services/projects.service';
import { CustomAlertService } from '../Shared/custom-alert.service';
import { FilterPipe } from '../Shared/filter.pipe';
import { OrderPipe } from 'ngx-order-pipe';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectDetailsList = [];
  sortedCollection = [];
  ListBackground = "#e6e9ef";
  public addButtonName: any;
  searchKey: string;
  public expression: string = 'ProjectName';
  order: string = 'ProjectId';
  reverse: boolean = false;
  
  constructor(private projectService: ProjectsService, private customAlert: CustomAlertService, private orderPipe: OrderPipe) {
  }
  getDefaultSort() {
    this.sortedCollection = this.orderPipe.transform(this.projectDetailsList, 'ProjectId');
  }
  ngOnInit() {
    this.loadProjectDetailsList();
  }
  loadProjectDetailsList() {
    this.projectService.getProjectDetails().subscribe(data => {
      this.projectDetailsList = data;
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
    if (this.projectService.form.valid) {
      this.projectService.insertUpdateProjectDetails(this.projectService.form.value)
        .subscribe(
        result => {
          this.clearData();
          this.loadProjectDetailsList();
          this.customAlert.successMessage('Submitted successfully');
        },
        error => this.customAlert.warningMessage(error)
        );
    }
  }
  onEdit(row) {
    this.projectService.SetFormValue(row);
    this.addButtonName = "Update";
  }
  onDelete(row) {
    if (confirm("Are you sure want to delete this User Data?")) {
      this.projectService.SetFormValue(row);
      this.projectService.deleteUser(this.projectService.form.value)
        .subscribe(
        result => {
          this.clearData();
          this.loadProjectDetailsList();
          this.customAlert.warningMessage("Deleted Successfully!");
        },
        error => console.error(error)
        );
    }
  }
  clearData() {
    this.projectService.form.reset();
    this.projectService.ClearForm();
    this.addButtonName = "Add";
  }
}
