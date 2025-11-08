import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  // For now this is just a placeholder for managing users
  users = [
    { name: 'Mahesh', email: 'mahesh@example.com', role: 'User' },
    { name: 'Teja', email: 'teja@example.com', role: 'Admin' }
  ];
}
