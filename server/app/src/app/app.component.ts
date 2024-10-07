import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, ToastComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
