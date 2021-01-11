import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from '../_models/user'

// this Injectable decorater means that this service can be injected into another components or services
// an Angular service is a Singleton when we inject it into our service, it will stay initialized untill it get disposed of (user closes browser) 
@Injectable({
  //this providedIn is metadata that gets handled app.module.ts
  providedIn: 'root'
})
export class AccountService {
  // to set prop use = to set it to a type use :
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  // inject httpClient into our service via constructor
  constructor(private http: HttpClient) { }

  // method to recieve our cred from our login form in NAV, in this case with typeof any
  login(model: any){
                                                  //pipe method is part of the RxJS extension
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) =>{
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
    })
    )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) =>{
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
    )
  }

  setCurrentUser(user: User){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }   
}
