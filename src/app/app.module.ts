import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {InputText, InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';
import {Table, TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule} from 'primeng/card';
import { UsuariosComponent } from 'src/forms/usuarios/usuarios.component';
import {Toast, ToastModule} from 'primeng/toast';
import {FileUploadModule} from 'primeng/fileupload';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule }  from 'primeng/password';
import {ToolbarModule} from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';
import { ProvinciasComponent } from './provincias/provincias.component';
import { LocalidadesComponent } from './localidades/localidades.component';
import { LocalidadService } from 'src/services/localidad/localidad.service';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CategoriasComponent } from './categorias/categorias/categorias.component';
import { ProductosComponent } from './productos/productos/productos.component';
import { ProductoProveedoresComponent } from './producto-proveedores/producto-proveedores.component';
import { JwtInterceptorInterceptor } from 'src/util/jwt-interceptor.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    LoginComponent,
    ProvinciasComponent,
    LocalidadesComponent,
    CategoriasComponent,
    ProductosComponent,
    ProductoProveedoresComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CardModule,
    ButtonModule,
    AppRoutingModule,
    InputTextModule,
    MenubarModule,
    TableModule,
    FileUploadModule,
    ToastModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToolbarModule,
    FormsModule,
    PanelModule,
    PasswordModule,
    DropdownModule,
    DialogModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, LocalidadService, ConfirmationService,
  {provide:HTTP_INTERCEPTORS, useClass:JwtInterceptorInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
