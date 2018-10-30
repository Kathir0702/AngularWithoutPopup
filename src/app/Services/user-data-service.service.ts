import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserDataEntities } from '../Models/model-entities';
@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {
  form: FormGroup = new FormGroup({
    UserId: new FormControl(''),
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    EmpId: new FormControl('', Validators.required),
    UserStatus: new FormControl(''),
    AddDate: new FormControl(''),
    UpdtDate: new FormControl('')
  });
 constructor(private httpClient: HttpClient) { }
  getUserDetails(): Observable<UserDataEntities[]> {
    return this.httpClient.get<UserDataEntities[]>('/api/UserDatas');
  }
  ClearForm() {
    this.form.setValue({
      UserId: '',
      FirstName: '',
      LastName: '',
      EmpId: '',
      UserStatus: '',
      AddDate: '',
      UpdtDate: ''
    });
  }
  SetFormValue(userDataDetails) {
    this.form.setValue(userDataDetails);
  }
    insertUpdateUserData(userDataDetails: UserDataEntities) {
    if (userDataDetails.UserId)
      return this.httpClient.put<UserDataEntities>('/api/UserDatas/' + userDataDetails.UserId, userDataDetails);
    else {
      userDataDetails.UserStatus = 'Y';
      return this.httpClient.post<UserDataEntities>('/api/UserDatas', userDataDetails);
    }
  }
  deleteUser(userDataDetails: UserDataEntities){
    userDataDetails.UserStatus = 'N';
    return this.httpClient.put<UserDataEntities>('/api/UserDatas/' + userDataDetails.UserId, userDataDetails);
  }
}
