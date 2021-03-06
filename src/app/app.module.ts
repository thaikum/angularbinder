import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsFormComponent } from './components/details-form/details-form.component';
import { FormsModule } from '@angular/forms';
import { IdDrawComponent } from './components/id-draw/id-draw.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { AdminComponent } from './components/admin/admin.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DrawSignatureDirective } from './directives/draw-signature.directive';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ModalDirective } from './directives/modal.directive';
import { SingleEmailEditComponent } from './components/single-email-edit/single-email-edit.component';
import { LongPressDirective } from './directives/long-press.directive';
import { HttpClientModule } from '@angular/common/http';

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
    AdminComponent,
    AutoFocusDirective,
    DrawSignatureDirective,
    ProfileComponent,
    ChangePasswordComponent,
    ModalDirective,
    SingleEmailEditComponent,
    LongPressDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    // firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,

    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
