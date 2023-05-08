import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from 'src/services/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLogged!:boolean;

  constructor(private primengConfig: PrimeNGConfig, private translateService: TranslateService, private authService:AuthService){

  }


  items!: MenuItem[];
  title = 'utn-frro-java-frontend-final';
 




  logout(){

  }


  ngOnInit(): void {
    this.isLogged = this.authService.isLoggedIn();
    this.translateService.setDefaultLang('es');
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
          },
          {
            label:'Precios',
            routerLink:'precios-productos'
          }
        ]
      },
      {
        label:'Pedidos',
        icon:'pi pi-dollar',
        items:[
          {
            label:'Crear pedido',
            routerLink:'pedidos/nuevo'
          },
          {
            label:'Pedidos',
            routerLink:'pedidos'
          },
        ]
      },
      {
        label:'Ingresar',
        icon:'pi pi-fw pi-user'
      }
    ]
  }

}
