import { Component } from '@angular/core';

import { UserService } from '../../../services/user.service';

import { TopMenuComponent } from '../../../components/top-menu/top-menu.component';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [TopMenuComponent],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {

}
