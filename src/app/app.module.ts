import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsFormComponent } from './components/details-form/details-form.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { IdDrawComponent } from './components/id-draw/id-draw.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

const firebaseConfig = {
  apiKey: 'AIzaSyBJ0JiaNOWmWmMh5PRU3QpizSXX3ZQ7Ic0',
  authDomain: 'databinder-9f333.firebaseapp.com',
  projectId: 'databinder-9f333',
  storageBucket: 'databinder-9f333.appspot.com',
  messagingSenderId: '1029407171625',
  appId: '1:1029407171625:web:22d4012906dd0b03542838',
};

@NgModule({
  declarations: [
    AppComponent,
    DetailsFormComponent,
    IdDrawComponent,
    LoginFormComponent,
    SignupFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,

    // firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
