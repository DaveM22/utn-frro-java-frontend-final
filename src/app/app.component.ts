import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Select, Selector, Store } from '@ngxs/store';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { ROLES } from 'src/models/models';
import { AuthService } from 'src/services/auth/auth.service';
import { IsLoginAction, LogoutAction } from 'src/store/actions/login.action';
import { LoginState } from 'src/store/states/login.state';
import { UtilState } from 'src/store/states/util.state';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Select(LoginState.isLogged) isLogged!:Observable<boolean>;
  @Select(UtilState.getBlockUI) blockUi$!:Observable<boolean>;
  @Select(LoginState.getRoles) getRoles$!:Observable<string>;
  mostrarMenu!:boolean;
  isAdmin!: boolean;
  data!: string;
  login!:boolean;
  roles!: string;
  items!:any;
  bloquear!:boolean;



  constructor(private primengConfig: PrimeNGConfig, private translateService: TranslateService, private router:Router, private store:Store){


  }


  title = 'Funense S.A';
  




  logout(){
    this.store.dispatch(new LogoutAction());
    this.router.navigateByUrl("/login")
  }

  


  ngOnInit(): void {
    this.blockUi$.subscribe(x => this.bloquear = x);
    this.getRoles$.subscribe(x => {
      this.roles = x;
      this.setMenuBar();
    });
    this.store.dispatch(new IsLoginAction());
    this.translateService.setDefaultLang('es');
    this.setMenuBar();
  }

  setMenuBar(){
    this.items = [
      {
        label:"Inicio",
        routerLink:"/"
      },
      {
        
        label:"Configuración",
        icon:'pi pi-cog',
        visible:this.roles.includes(ROLES.ADMIN),
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
        
      },
      {
        label: 'Personal',
        icon:'pi pi-user',
        visible:this.roles.includes(ROLES.ADMIN),
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
        visible:this.roles.includes(ROLES.ADMIN),
        items:[
          {
            label:'Categorías',
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
