import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }
  users: any;
  displayedColumns: string[] = ['email', 'role'];
  dataSource: any;

  ngOnInit(): void {
    this.getUsers();
  }
  async getUsers(){
     await this.auth.getAllUsers().subscribe(
      res =>{
        this.users = res;
        this.dataSource = res;
        console.log(this.users);
      },
      err => {
        console.log(err);
      }
    )
  }

  delete(email){
    console.log(email);
    this.auth.deletUser(email).subscribe(
      res => {
        alert('Usuario eliminado');
        window.location.reload();
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

}
