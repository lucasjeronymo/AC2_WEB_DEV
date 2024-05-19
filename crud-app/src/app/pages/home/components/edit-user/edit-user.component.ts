import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm!: FormGroup;
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      this.loadUserData(this.userId);
    });
  }

  initForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });
  }

  loadUserData(userId: number) {
    const user = this.userService.getUsersList().find(u => u.id === userId);
    if (user) {
      this.userForm.patchValue({
        name: user.name,
        email: user.email,
        role: user.role,
        password: user.password
      });
    }
  }

  updateUser() {
    const updatedUser: User = {
      id: this.userId,
      ...this.userForm.value
    };
    this.userService.updateUser(updatedUser);
    this.router.navigate(['/users']);
  }
}