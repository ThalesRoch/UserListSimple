import { Component, OnInit } from '@angular/core';
import { IUser } from './interfaces/user/user.interface';
import { UsersList } from './data/users-list';
import { IFilterOptions } from './interfaces/filter-options-interface';
import { isWithinInterval } from 'date-fns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements  OnInit {
  userSelected : IUser = {} as IUser;
  showUserDetail : boolean = false;
  usersList : IUser[] = [];
  usersListFiltered : IUser[] = [];

  ngOnInit() {
    setTimeout(() => {
      this.usersList = UsersList;
      this.usersListFiltered = this.usersList;
    }, 1)

  }

  onUserSelected(user : IUser) {
    this.userSelected = user;
    this.showUserDetail = true;
  }

  onFilter(filterOptions : IFilterOptions) {
    this.usersListFiltered = this.filterUsersList(filterOptions, this.usersList);

  }

  filterUsersList(filterOptions: IFilterOptions, usersList: IUser[]): IUser[] {
    let filteredList: IUser[] = [];

    filteredList = this.filterUsersListByName(filterOptions.name, usersList);
    filteredList = this.filterUsersListByStatus(filterOptions.status, usersList);
    filteredList = this.filterUsersListByDate(filterOptions.startDate, filterOptions.endDate, filteredList)


    return filteredList;
  }
  filterUsersListByDate(startDate: Date | undefined, endDate: Date | undefined, usersList: IUser[]): IUser[] {
    const DATE_NOT_SELECTED = startDate === undefined || endDate === undefined;

    if(DATE_NOT_SELECTED) {
      return usersList;
    }

    const listFiltered = usersList.filter((user) => isWithinInterval(new Date(user.dataCadastro), {
        start: startDate,
        end: endDate,
    }));
    return listFiltered;


  }

  filterUsersListByStatus(status: boolean | undefined, usersList: IUser[]): IUser[] {
    const STATUS_NOT_TYPPED = status === undefined;

    if(STATUS_NOT_TYPPED) {
      return UsersList;
    }

    const filteredList = usersList.filter((user) => user.ativo === status);
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
