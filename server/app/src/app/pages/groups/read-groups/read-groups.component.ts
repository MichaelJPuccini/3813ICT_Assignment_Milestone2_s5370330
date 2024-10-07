import { Component } from '@angular/core';

import { DisplayGroupsComponent } from '../../../components/display-groups/display-groups.component'; // Adjust the import path as needed
import { TopMenuComponent } from '../../../components/top-menu/top-menu.component';

@Component({
  selector: 'app-read-groups',
  standalone: true,
  imports: [DisplayGroupsComponent, TopMenuComponent],
  templateUrl: './read-groups.component.html',
  styleUrl: './read-groups.component.css'
})
export class ReadGroupsComponent {

}
