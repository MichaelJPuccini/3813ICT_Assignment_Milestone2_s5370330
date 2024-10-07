import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DisplayGroupsComponent } from '../../../components/display-groups/display-groups.component'; // Adjust the import path as needed
import { TopMenuComponent } from '../../../components/top-menu/top-menu.component';

@Component({
  selector: 'app-read-groups',
  standalone: true,
  imports: [DisplayGroupsComponent, TopMenuComponent, CommonModule, RouterModule],
  templateUrl: './read-groups.component.html',
  styleUrl: './read-groups.component.css'
})
export class ReadGroupsComponent implements OnInit {

  isSuperUser: boolean = false;

  ngOnInit(): void {
    // Is this user a SuperUser?
    const userRole = localStorage.getItem('userrole') || "";
    this.isSuperUser = userRole == "SuperUser";
  }
}
