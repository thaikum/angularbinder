import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() isAdmin!: boolean;
  @Input() userEmail!: string;

  @Output() logout: EventEmitter<void> = new EventEmitter<void>();
  @Output() changePassword: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}
}
