import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, updateProfile, UserInfo } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from '@firebase/auth';
import {  } from '@firebase/util';
import { from, switchMap, Observable, concatMap, of } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }
  
  login(email: string, password: string) {
   return  from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signUp( name: string, email: string, password: string){
    return  from(createUserWithEmailAndPassword(this.auth, email, password))
    .pipe(switchMap(({user}) => updateProfile(user, {displayName: name})))
  }

  logout() {
    return from(this.auth.signOut());
  }

  updateProfileData(profileData: Partial<UserInfo>): Observable<any>{
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap(user => {
        if(!user) throw new Error('Not Authenticated')

        return updateProfile(user, profileData)
      })
    )
  }
}

