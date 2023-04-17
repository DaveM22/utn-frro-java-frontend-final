import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LocalidadesComponent } from './localidades/localidades.component';
import { CategoriasComponent } from './categorias/categorias/categorias.component';
import { ProductosComponent } from './productos/productos/productos.component';
import { ProductoProveedoresComponent } from './producto-proveedores/producto-proveedores.component';
import { ProvinciasComponent } from './provincias/provincias.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path:'localidades', component:LocalidadesComponent},
  {path:'categorias', component:CategoriasComponent},
  {path:'productos', component:ProductosComponent},
  {path:'productos-proveedores/:idProducto', component:ProductoProveedoresComponent},
  {path:'provincias', component:ProvinciasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
