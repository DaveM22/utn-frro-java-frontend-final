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

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path:'localidades', component:LocalidadesComponent},
  {path:'categorias', component:CategoriasComponent},
  {path:'productos', component:ProductosComponent},
  {path:'productos-proveedores/:idProducto', component:ProductoProveedoresComponent},
  {path:'productos-proveedores/:idProducto/nuevo', component:ProductSupplierFormComponent},
  {path:'provincias', component:ProvinciasComponent},
  {path:'pedidos', component:PedidosComponent},
  {path:'pedidos/nuevo', component:NewOrderComponent},
  {path:'clientes', component:CostumerComponent},
  {path:'proveedores', component:SupplierComponent},
  {path:'precios-productos', component:ProductsPricesComponent},
  {path:'precios-productos/:idProducto/:idPersona', component:PricesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
