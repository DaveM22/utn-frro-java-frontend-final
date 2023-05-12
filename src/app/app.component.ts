import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/services/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mostrarMenu!:boolean;
  isAdmin!: boolean;
  isLogged!:boolean;
  data!: string;

  roles!: string;
  items!:any;


  constructor(private primengConfig: PrimeNGConfig, private translateService: TranslateService, private authService:AuthService, private router:Router){


  }


  title = 'Funense S.A';
  




  logout(){
    this.authService.logout();
    this.router.navigateByUrl("/login")
  }

  


  ngOnInit(): void {

    this.authService.getIsAuthenticated().subscribe(isAuthenticated => {
      console.log(isAuthenticated);
      this.mostrarMenu = isAuthenticated;



  });
  this.authService.getUserRoles().subscribe(userRoles => {
    this.roles = userRoles;
    this.isAdmin = this.roles.includes("ADMIN");
    this.setMenuBar();
  });




    this.translateService.setDefaultLang('es');
    
  }

  setMenuBar(){
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
          },
          {
            label:"Descuentos",
            routerLink:"descuentos"
          }
        ],
        visible:this.isAdmin
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
        ],
        visible:this.isAdmin
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
