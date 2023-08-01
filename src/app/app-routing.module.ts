import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LocalidadesComponent } from './localidades/localidades.component';
import { CategoriasComponent } from './categorias/categorias/categorias.component';
import { ProductosComponent } from './productos/productos/productos.component';
import { ProductoProveedoresComponent } from './producto-proveedores/producto-proveedores.component';
import { ProvinciasComponent } from './provincias/provincias.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { CostumerComponent } from './customer/costumer.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ProductSupplierFormComponent } from './components/product-supplier-form/product-supplier-form.component';
import { PricesComponent } from './prices/prices.component';
import { ProductsPricesComponent } from './products-prices/products-prices.component';
import { adminGuard, permissionGuard } from 'src/util/user-guard.guard';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { UsersComponent } from './users/users.component';
import { DiscountComponent } from './discount/discount.component';
import { UsuariosComponent } from 'src/forms/usuarios/usuarios.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path:'', component:MainComponent, canActivate:[permissionGuard]},
  {path:'descuentos', component:DiscountComponent, canActivate: [adminGuard]},
  {path:'localidades', component:LocalidadesComponent, canActivate: [adminGuard]},
  {path:'categorias', component:CategoriasComponent, canActivate: [permissionGuard]},
  {path:'productos', component:ProductosComponent, canActivate: [permissionGuard]},
  {path:'productos-proveedores/:idProducto', component:ProductoProveedoresComponent, canActivate: [permissionGuard]},
  {path:'productos-proveedores/:idProducto/nuevo', component:ProductSupplierFormComponent, canActivate: [permissionGuard]},
  {path:'provincias', component:ProvinciasComponent, canActivate: [adminGuard]},
  {path:'pedidos', component:PedidosComponent, canActivate: [permissionGuard]},
  {path:'pedidos/detalle/:id', component:OrderDetailsComponent, canActivate: [permissionGuard]},
  {path:'pedidos/nuevo', component:NewOrderComponent, canActivate: [permissionGuard]},
  {path:'clientes', component:CostumerComponent, canActivate: [permissionGuard]},
  {path:'proveedores', component:SupplierComponent, canActivate: [permissionGuard]},
  {path:'precios-productos', component:ProductsPricesComponent, canActivate: [permissionGuard]},
  {path:'precios-productos/:idProducto/:idPersona', component:PricesComponent, canActivate: [permissionGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
