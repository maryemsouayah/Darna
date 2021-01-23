import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(private http: HttpClient) { }

  getCommentById(id) {
    return this.http.get(environment.host + '/api/getCommentEventById/' + id);
  }
  addNewComment(id,obj) {
    return this.http.post(environment.host + '/api/newComment/'+id , obj);
  }
  deleteComment(id) {
    return this.http.delete(environment.host + '/api/delete-comment/'+id);
  }
 
  updateComment(id, updateForm) {
    return this.http.delete(environment.host + '/api/delete-comment/'+id,updateForm);
  }
  getCommentUserById(id) {
    return this.http.delete(environment.host + '/api/getCommentUserById/'+id);
  }
}
