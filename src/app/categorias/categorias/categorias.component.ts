import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Categoria } from 'src/models/models';
import { CategoriasService } from 'src/services/categorias/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  categorias:Categoria[] = [];

  categoria!:Categoria; 
  submitted!:boolean;
  categoriaDialog!:boolean;

  constructor(
    private categoriaService:CategoriasService,
    private confirmacionService:ConfirmationService,
    private messageService:MessageService){

  }


  ngOnInit(): void {
    this.categoriaService.listaCategorias().subscribe((res:any) => this.categorias = res.payload);
  }

  abrirNuevo() {
    this.categoria = { id:0,nombre:''};
    this.submitted = false;
    this.categoriaDialog = true;
  }

  CerrarDialog(){
    this.confirmacionService.close();
  }

  Guardar(){
    this.submitted = true;
    if(this.categoria.id === 0){
      this.categoriaService.crearCategoria(this.categoria).subscribe((res:any) => {
        this.categorias.push(res.payload);
        this.messageService.add({ severity: 'success', summary: 'Crear categoria', detail: res.message, life: 5000 });
      });
    }
    else{
      this.categoriaService.editarCategoria(this.categoria).subscribe((res:any) => {
        this.categorias[this.categorias.indexOf(res.payload.id)] = res.payload;
        this.messageService.add({ severity: 'success', summary: 'Editar categoria', detail: res.message , life: 5000 });
      })
    }
    this.categoriaDialog = false;
    this.categoria = {id:0, nombre:''};
  }

  editarCategoria(categoria: Categoria) {  
    this.categoria = categoria;
    this.categoriaDialog = true;   
  }

  borrarCategoria(categoria: Categoria){
    this.categoria = categoria;
    this.confirmacionService.confirm({message: '¿Estas seguro de borrar la siguiente categoria: ' + this.categoria.nombre + '?',
    header: 'Eliminar categoria',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel:'Aceptar',
    rejectLabel:'Cancelar'
    });
  }

  borrar(){
    this.categoriaService.borrarCategoria(this.categoria.id).subscribe((res:any) => {
      this.categorias = this.categorias.filter((val) => val.id !== this.categoria.id);
      this.messageService.add({ severity: 'success', summary: 'Borrar categoria', detail: res.message , life: 5000 });
    })
    this.confirmacionService.close();
  }
}
