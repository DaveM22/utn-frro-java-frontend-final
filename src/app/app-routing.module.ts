import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LocalidadesComponent } from './localidades/localidades.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path:'localidades', component:LocalidadesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
