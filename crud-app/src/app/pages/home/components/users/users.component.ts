import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  userList: User[] = [];
  private usersSub: Subscription;

  constructor(private router: Router, private userService: UserService) {
    this.usersSub = new Subscription(); }

  ngOnInit() {
    this.userList = this.userService.getUsersList();
    this.usersSub = this.userService.getUserUpdatedListener().subscribe(
      (users: User[]) => {
        this.userList = users;
      }
    );
  }

  editUser(userId: number) {
    this.router.navigate(['/edit-user', userId]);
  }
  deleteUser(id: number) {
    this.userService.deleteUser(id);
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }
}