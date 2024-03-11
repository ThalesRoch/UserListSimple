import { Component, OnInit } from '@angular/core';
import { IUser } from './interfaces/user/user.interface';
import { UsersList } from './data/users-list';
import { IFilterOptions } from './interfaces/filter-options-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements  OnInit {
  userSelected : IUser = {} as IUser;
  showUserDetail : boolean = false;
  usersList : IUser[] = []

  ngOnInit() {
    setTimeout(() => {
      this.usersList = UsersList;
    }, 3000)

  }

  onUserSelected(user : IUser) {
    this.userSelected = user;
    this.showUserDetail = true;
  }

  onFilter(filterOptions : IFilterOptions) {

  }

}
