import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
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
  mostrarMenu = true;
  isLogged!:boolean;

  constructor(private primengConfig: PrimeNGConfig, private translateService: TranslateService, private authService:AuthService, private router:Router){
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        if(val.url === '/login'){
          this.mostrarMenu = false;
        }
        else{
          this.mostrarMenu = true;
        }
      }
    });
  }


  items!: MenuItem[];
  title = 'Ferreteria';
  




  logout(){
    localStorage.removeItem("token");
    this.router.navigateByUrl("/login")
  }


  ngOnInit(): void {
    this.translateService.setDefaultLang('es');
    this.items = [
      {
        label:"Configuración",
        icon:'pi pi-cog',
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
        icon:'pi pi-user',
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
        icon:'pi pi-calculator',
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
        label:'Salir',
        command: () => this.logout()
      
      }
    ]
  }

}
