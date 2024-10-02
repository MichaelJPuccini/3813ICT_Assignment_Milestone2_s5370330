import { Component } from '@angular/core';

import { DisplayGroupsComponent } from '../../../components/display-groups/display-groups.component'; // Adjust the import path as needed

@Component({
  selector: 'app-read-groups',
  standalone: true,
  imports: [DisplayGroupsComponent],
  templateUrl: './read-groups.component.html',
  styleUrl: './read-groups.component.css'
})
export class ReadGroupsComponent {

}
