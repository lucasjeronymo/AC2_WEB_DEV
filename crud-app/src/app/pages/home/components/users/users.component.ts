import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  userList: User[] = [
      { id: 1, name: 'Lucas', email: 'lucas@gmail.com', role: 'Engenheiro de FE', password:'Ladmin' },
      { id: 2, name: 'Vinicius', email: 'vinicius@gmail.com', role: 'Engenheiro de BE', password:'Vadmin' },
      { id: 3, name: 'Roberto', email: 'roberto@gmail.com', role: 'Analista de dados', password:'Radmin' },
      { id: 4, name: 'Roberta', email: 'roberta@gmail.com', role: 'Líder Técnico', password:'Radmin' }
  ];

  constructor(private router: Router) {}

  deleteUser(id: number) {
    //Remover usuário da lista usando ID
    this.userList = this.userList.filter(user => user.id !== id);
  }

  addUser(newUser: User) {
    //Adicionar novo usuário à lista
    this.userList.push(newUser);
  }
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  password: string;
}
