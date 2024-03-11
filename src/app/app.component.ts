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
  usersList : IUser[] = [];
  usersListFiltred : IUser[] = [];

  ngOnInit() {
    setTimeout(() => {
      this.usersList = UsersList;
      this.usersListFiltred = this.usersList;
    }, 1)

  }

  onUserSelected(user : IUser) {
    this.userSelected = user;
    this.showUserDetail = true;
  }

  onFilter(filterOptions : IFilterOptions) {
    this.usersListFiltred = this.filterUsersList(filterOptions, this.usersList);

  }
  filterUsersList(filterOptions: IFilterOptions, usersList: IUser[]): IUser[] {
    let filteredList: IUser[] = [];

    filteredList = this.filterUsersListByName(filterOptions.name, usersList);

    return filteredList;
  }
  filterUsersListByName(name: string | undefined, usersList: IUser[]): IUser[] {
    const NAME_NOT_TYPPED = name === undefined;

    if(NAME_NOT_TYPPED) {
      return usersList;
    }

    const filteredList = usersList.filter((user) => user.nome.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
    return filteredList;
  }

}
