import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {




  items!: MenuItem[];
  title = 'utn-frro-java-frontend-final';
 
  constructor(){

  }



  logout(){

  }


  ngOnInit(): void {
    this.items = [
      {
        label:"Configuración",
        items:[
          {
            label:"Provincias",
            routerLink:'/provincias'
          },
          {
            label:"Localidades",
            routerLink:'/localidades'
          }
        ]
      },
      {
        label: 'Mi CVs',
        items:[
          {
            label:'Agregar nuevo CV',
            routerLink:'/mis-cvs'
          }
        ]
      }
    ]
  }

}
