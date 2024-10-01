import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  // imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
}
