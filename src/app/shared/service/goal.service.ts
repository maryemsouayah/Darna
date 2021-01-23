import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GoalService {


  constructor(private http: HttpClient) { }
  getGoals() {
    return this.http.get(environment.host + '/api/all-goals');
  }
  addNewGoal(obj) {
    return this.http.post(environment.host + '/api/add-goal', obj);
  }
  deleteGoal(id) {
    return this.http.delete(environment.host + '/api/delete-goal/' + id);
  }
  updateGoal(id, updateGoalForm) {
    return this.http.put(environment.host + '/api/update-goal/' + id, updateGoalForm);
  }
  getGoalById(id) {
      return this.http.get(environment.host + '/api/details-goal/' + id);
    }
}
