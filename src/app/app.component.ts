import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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
            routerLink:'provincias'
          },
          {
            label:"Localidades",
            routerLink:'localidades'
          }
        ]
      },
      {
        label: 'Personal',
        items:[
          {
            label:'Proveedores',
            routerLink:'proveedores'
          },
          {
            label:'Clientes',
            routerLink:'clientes'
          }
        ]
      },
      {
        label:'Inventario',
        items:[
          {
            label:'Categorias',
            routerLink:'categorias'
          },
          {
            label:'Productos',
            routerLink:'productos'
          }
        ]
      },
      {
        label:'Ingresar',
        icon:'pi pi-fw pi-user'
      }
    ]
  }

}
