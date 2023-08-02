import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ROLES } from 'src/models/models';
import { LoginState } from 'src/store/states/login.state';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


   @Select(LoginState.getRoles) getRoles$!:Observable<string>

   getRoles!:string
   isAdmin!:boolean


   ngOnInit(): void {
    this.getRoles$.subscribe(x => {
      this.getRoles = x
      this.isAdmin = this.getRoles.includes(ROLES.ADMIN);
    });
  }
   
}
