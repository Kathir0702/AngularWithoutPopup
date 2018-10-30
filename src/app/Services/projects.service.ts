import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ProjectEntities } from '../Models/model-entities';
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  form: FormGroup = new FormGroup({
    ProjectId: new FormControl(''),
    ProjectName: new FormControl('', Validators.required),
    ProjectPriority: new FormControl('1'),
    DateReqd: new FormControl(''),
    StartDate: new FormControl(''),
    EndDate: new FormControl(''),
    ManagerId: new FormControl(''),
    ProjectStatus: new FormControl(''),
    AddDate: new FormControl(''),
    UpdtDate: new FormControl(''),
  });
  constructor(private httpClient: HttpClient) { }
  getProjectDetails(): Observable<ProjectEntities[]> {
    return this.httpClient.get<ProjectEntities[]>('/api/Projects');
  }
  ClearForm() {
    this.form.setValue({
      ProjectId: '',
      ProjectName: '',
      ProjectPriority: '',
      DateReqd: '',
      StartDate: '',
      EndDate: '',
      ManagerId: '',
      ProjectStatus: '',
      AddDate: '',
      UpdtDate: ''
    });
  }
  SetFormValue(projectDetails) {
    this.form.setValue(projectDetails);
  }
   insertUpdateProjectDetails(projectDetails: ProjectEntities) {
    if (projectDetails.ProjectId)
      return this.httpClient.put<ProjectEntities>('/api/Projects/' + projectDetails.ProjectId, projectDetails);
    else {
      projectDetails.ProjectStatus = 'Y';
      return this.httpClient.post<ProjectEntities>('/api/Projects', projectDetails);
    }
  }
  deleteUser(projectDetails: ProjectEntities){
    projectDetails.ProjectStatus = 'N';
    return this.httpClient.put<ProjectEntities>('/api/Projects/' + projectDetails.ProjectId, projectDetails);
  }
}
