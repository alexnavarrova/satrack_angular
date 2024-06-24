import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html'
})
export class CustomModalComponent {
  @Input() title: string = 'Default Title';
  @Output() confirmed: EventEmitter<void> = new EventEmitter<void>();
  @Output() canceled: EventEmitter<void> = new EventEmitter<void>();
  isOpen: boolean = false;

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
    this.canceled.emit();
  }

  onConfirm() {
    debugger
    this.confirmed.emit();
    this.closeModal();
  }
}
