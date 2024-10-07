import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  showToast() {
    this.toastService.add('This is a toast message.');
  }

  removeToast(index: number) {
    this.toastService.remove(index);
  }
}
