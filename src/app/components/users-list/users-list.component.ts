import { Component, EventEmitter, Output } from '@angular/core';
import { IUser } from '../../interfaces/user/user.interface';
import { UsersList } from '../../data/users-list';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  displayedColumns: string[] = ['name', 'date', 'status'];

  usersList: IUser[] = UsersList;

  @Output() positionUser = new EventEmitter<number>();

  onUsersSelected(user: IUser) {
    this.positionUser.emit(this.positionUser.length);
  }

}
