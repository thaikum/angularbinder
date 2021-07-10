import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(public auth: AngularFireAuth) {}

  // signUp to firebase using an email and password
  async signUp(details: any): Promise<any> {
    const password = details.password;
    const email = details.email;

    try {
      // first ensure that the email / password are not empty
      if (!email || !password) {
        throw Error('Invalid email and/or password');
      }
      const user = await this.auth.createUserWithEmailAndPassword(
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
      const user = await this.auth.signInWithEmailAndPassword(email, password);
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
      await this.auth.signOut();
      localStorage.removeItem('dataBinderUser'); // clear the session
      return true;
    } catch (error) {
      return false;
    }
  }
}
