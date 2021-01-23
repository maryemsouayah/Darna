import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListMemberService {
  constructor(private http: HttpClient) { }
  token;
  getAllMembers() {
    return this.http.get(environment.host + '/api/listMember');
  }
  getMembers(createDate) {
     this.token=sessionStorage.getItem('token')
     console.log(this.token)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    }).set('Authorization' ,'Bearer ' + this.token);

    const options = { headers: headers };
    return this.http.get(environment.host + '/api/getMemberByYear/'+createDate );
  }
  //getMember
  getMember(id) {
    return this.http.get(environment.host + '/api/detailsMember/' + id);
  }
  addMember(obj) {
    return this.http.post(environment.host + '/api/addMember', obj);
  }
  deleteMember(id) {
    return this.http.delete(environment.host + '/api/deleteMember/' + id);
  }
  updateMember(id, updateForm) {
    return this.http.put(environment.host + '/api/updateMember/' + id, updateForm);
  }
  updateStateMember(id, value) {
    return this.http.put(environment.host + '/api/updateStateMember/' + id, { statut: value });
  }
  // archiverMember(id,value){
  //   return this.http.put(host + '/api/archivermember/' + id, { statut: value });
  // }
  renewMember(id,create_date){
    return this.http.put(environment.host + '/api/renewMember/' + id,{create_date});
  }
  checkPassword(id,oldPassword){
    return this.http.put(environment.host + '/api/checkPassword/' + id, { password: oldPassword });

  }
  saveNewPassword(id,newPassword){
    return this.http.put(environment.host + '/api/saveNewPassword/' + id, {newPassword });

  }

}
