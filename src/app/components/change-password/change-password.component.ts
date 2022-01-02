import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  error = '';
  success = false;
  isLoading = false;

  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {}

  modalClose(): void {
    this.closeModal.emit();
  }

  contClicked(event: MouseEvent): void {
    event.stopPropagation();
  }

  changePassword(changePWord: NgForm): void {
    this.isLoading = true;
    const values = changePWord.value;
    const password1 = values.password1;
    console.log(password1);
    this.auth
      .changePassword()
      ?.updatePassword(password1)
      .then(() => {
        this.isLoading = false;
        this.success = true;
      })
      .catch((err) => {
        this.isLoading = false;
        this.error = err.message;
        changePWord.reset();
      });
  }
}
