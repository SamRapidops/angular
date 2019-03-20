import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User;	
  private baseUri: string="http://localhost:3333";
  private headers = new HttpHeaders().set('Content-type' , 'application/json');
  constructor(private http:HttpClient) { }

  createUser(user:User) {
  	return this.http.post(this.baseUri+'/create' , user , {headers:this.headers});
  }

  readUsers() {
  	return this.http.get(this.baseUri+'/read', {headers:this.headers});
  }

  updateUser(user:User) {
  	return this.http.put(this.baseUri+'/update' , user , {headers:this.headers});
  }

  deleteUser(id:string) {
  	return this.http.delete(this.baseUri+'/delete/'+id, {headers:this.headers});
  }

  setter(user:User) {
  	this.user=user;
  }

  getter() {
  	return this.user;
  }
}
