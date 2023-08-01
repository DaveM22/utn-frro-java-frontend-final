import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PanelModule } from 'primeng/panel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {InputText, InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';
import {Table, TableModule} from 'primeng/table';
import {RadioButtonModule} from 'primeng/radiobutton';
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
import { LocationService } from 'src/services/localidad/localidad.service';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CategoriasComponent } from './categorias/categorias/categorias.component';
import { ProductosComponent } from './productos/productos/productos.component';
import { ProductoProveedoresComponent } from './producto-proveedores/producto-proveedores.component';
import { JwtInterceptorInterceptor } from 'src/util/jwt-interceptor.interceptor';
import { PedidosComponent } from './pedidos/pedidos.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { ParticularComponent } from './customer-particular/particular.component';
import { TabViewModule } from 'primeng/tabview';
import { CostumerComponent } from './customer/costumer.component';
import { StepsModule } from 'primeng/steps';
import { CustomerCompanyComponent } from './customer-company/customer-company.component';
import { ListParticularComponent } from './components/list-particular/list-particular.component';
import { ListCompanyComponent } from './components/list-company/list-company.component';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ProductSupplierFormComponent } from './components/product-supplier-form/product-supplier-form.component';
import { ListSuppliersComponent } from './components/list-suppliers/list-suppliers.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ListProductAmountComponent } from './components/list-product-amount/list-product-amount.component';
import { PricesComponent } from './prices/prices.component';
import { ListPricesComponent } from './components/list-prices/list-prices.component';
import { ProductsPricesComponent } from './products-prices/products-prices.component';
import { ResumeOrderComponent } from './components/resume-order/resume-order.component';
import { PriceFormComponent } from './components/price-form/price-form.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CalendarModule } from 'primeng/calendar';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { MainComponent } from './main/main.component';
import { BlockUIModule } from 'primeng/blockui';
import { UsersComponent } from './users/users.component';
import { NgxsModule } from '@ngxs/store';
import { LocationState } from 'src/store/states/location.state';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { LocationFormModalComponent } from './components/forms/location-form-modal/location-form-modal.component';
import { ProvinceState } from 'src/store/states/province.state';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { UtilState } from 'src/store/states/util.state';
import { SupplierState } from 'src/store/states/supplier.state';
import { CategoryState } from 'src/store/states/category.state';
import { ProductState } from 'src/store/states/product.state';
import { DiscountComponent } from './discount/discount.component';
import { CustomerParticularState } from 'src/store/states/customer.particular.state';
import { CustomerCompanyState } from 'src/store/states/customer.company.state';
import { ProductSupplierState } from 'src/store/states/product-supplier.state,';
import { PriceState } from 'src/store/states/price.state';
import { LoginState } from 'src/store/states/login.state';
import { DiscountState } from 'src/store/states/discount.state';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { SplitterModule } from 'primeng/splitter';
import { environment } from 'src/environments/environment';
import {SplitButton, SplitButtonModule} from 'primeng/splitbutton';
import { OrderState } from 'src/store/states/order.state';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    LoginComponent,
    ProvinciasComponent,
    LocalidadesComponent,
    CategoriasComponent,
    ProductosComponent,
    ProductoProveedoresComponent,
    PedidosComponent,
    NewOrderComponent,
    ParticularComponent,
    CostumerComponent,
    CustomerCompanyComponent,
    ListParticularComponent,
    ListCompanyComponent,
    ListCustomerComponent,
    ListProductsComponent,
    SupplierComponent,
    ProductSupplierFormComponent,
    ListSuppliersComponent,
    ListProductAmountComponent,
    PricesComponent,
    ListPricesComponent,
    ProductsPricesComponent,
    ResumeOrderComponent,
    PriceFormComponent,
    MainComponent,
    UsersComponent,
    LocationFormModalComponent,
    DiscountComponent,
    OrderDetailsComponent
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
    ConfirmDialogModule,
    PanelModule,
    CardModule,
    ButtonModule,
    TabViewModule,
    StepsModule,
    InputNumberModule,
    CalendarModule,
    SplitButtonModule,
    TranslateModule.forRoot(),
    JwtModule,
    BlockUIModule,
    TabMenuModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    SplitterModule,
    NgxsModule.forRoot([
      LocationState, 
      ProvinceState, 
      UtilState, 
      SupplierState, 
      CategoryState, 
      ProductState, 
      CustomerParticularState, 
      CustomerCompanyState,
      ProductSupplierState,
      PriceState,
      DiscountState,
      OrderState,
     LoginState]),
    DialogModule,
    DynamicDialogModule,
    NgxsLoggerPluginModule.forRoot({
      disabled: !environment.production,
      logger: console
    })
  ],
  providers: [MessageService, LocationService, ConfirmationService,TranslateService,DialogService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  {provide:HTTP_INTERCEPTORS, useClass:JwtInterceptorInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
