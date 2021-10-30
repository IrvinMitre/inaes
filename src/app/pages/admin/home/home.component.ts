import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private aut: AuthService, private route: ActivatedRoute,) { }
  correo: string

  ngOnInit(): void {
    console.log(this.route.snapshot.params.id)
    this.aut.getUser(this.route.snapshot.params.id).subscribe(
      (res)=>{
        console.log(res)
this.correo = this.route.snapshot.params.id
      },
      (err)=>{

      }

    )
  }

}
