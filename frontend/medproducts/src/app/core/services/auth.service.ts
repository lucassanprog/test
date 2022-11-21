import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  logged(data: any) {
    localStorage.setItem('token', data.password);
    localStorage.setItem('user', data.givenName + " " + data.surname);
    localStorage.setItem('role', data.role);
  }
  getCurrentUser(): any{
    var currentUser =  { user: "", role: ""};
    let user = localStorage.getItem('user');
    let role = localStorage.getItem('role');

    if(user !=null && role != null){
      currentUser.user = user;
      currentUser.role =  role;

      return currentUser
    }else{
      return null
    }
  }

  isAuthenticated() {
    let token = localStorage.getItem('token')
    if(token != null) {
      return !this.jwtService.isTokenExpired(token);
    }
    return false
  }
  logout() {
    localStorage.clear();
  }
}
