import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import auth = firebase.auth;
import User = firebase.User;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private authentication: AngularFireAuth) {}

  // signUp to firebase using an email and password
  async signUp(details: any): Promise<any> {
    const password = details.password;
    const email = details.email;

    try {
      // first ensure that the email / password are not empty
      if (!email || !password) {
        throw Error('Invalid email and/or password');
      }
      const user = await this.authentication.createUserWithEmailAndPassword(
        email,
        password
      );
      // @ts-ignore
      localStorage.setItem('dataBinderUser', user.user?.uid); // create a session in the browser
      return user.user?.uid;
    } catch (error) {
      throw error.message;
    }
  }

  // account creation using email and password
  async signIn(email: string, password: string): Promise<any> {
    try {
      // ensure that the email/ password are not empty
      if (!email || !password) {
        throw Error('Please fill in all fields!');
      }
      const user = await this.authentication.signInWithEmailAndPassword(
        email,
        password
      );
      // @ts-ignore
      localStorage.setItem('dataBinderUser', user.user?.uid); // create a session in the browser

      return true;
    } catch (error) {
      throw error.message;
    }
  }

  // signout a user
  async signOut(): Promise<boolean> {
    try {
      await this.authentication.signOut();
      localStorage.removeItem('dataBinderUser'); // clear the session
      return true;
    } catch (error) {
      return false;
    }
  }

  changePassword(): User | null {
    // @ts-ignore
    auth().currentUser.getIdToken(true).then();

    return auth().currentUser;
  }
}
