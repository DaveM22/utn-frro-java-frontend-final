import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Category, ResponseHttp } from 'src/models/models';
import { CategoriasService } from 'src/services/categorias/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  categorias:Category[] = [];

  categoria!:Category; 
  submitted!:boolean;
  categoryDialog!: boolean;
  isEditForm!: boolean;

  categoryForm = this.fb.group({
    id:[0, Validators.required],
    name:['', Validators.required],
  });

  constructor(
    private categoriaService:CategoriasService,
    private confirmacionService:ConfirmationService,
    private messageService:MessageService,
    private fb:FormBuilder){

  }


  ngOnInit(): void {
    this.categoriaService.listaCategorias().subscribe((res:any) => this.categorias = res.payload);
  }



  openModalForm() {
    this.categoryForm.reset();
    this.submitted = false;
    this.categoryDialog = true;
    this.isEditForm = false;
  }


  closeModalForm(){
    this.categoryDialog = false;
    this.submitted = false;
  }

  save(){
    if(this.isEditForm){
      this.edit();
    }
    else{
     this.create();
    }
  }

  create(){
    let obj = this.categoryForm.value as Category;
    this.categoriaService.postCategory(obj).subscribe({
      next:(res) => {
        let response = res.payload as Category;
        this.messageService.add({ severity: 'success', summary: 'Crear categoría', detail: res.message, life: 3000 });
        this.categoryDialog = false;
        this.categorias.push(response);
      },
      error:(err) => {
        this.messageService.add({ severity: 'error', summary: 'Error al crear categoría', detail: err.error.errorMessage, life: 3000 });
      }
    });
  }

  edit(){
    let obj = this.categoryForm.value as Category;
    this.categoriaService.putCategory(obj).subscribe({
      next:(res:ResponseHttp) => {
        let response = res.payload as Category;
        this.messageService.add({ severity: 'success', summary: 'Editar categoría', detail: res.message, life: 3000 });
        this.categoryDialog = false;
        this.categorias[this.categorias.findIndex(z => z.id === response.id)] = response;
      },
      error:(err) => {
        this.messageService.add({ severity: 'error', summary: 'Error al editar categoría', detail: err.error.errorMessage, life: 3000 });
      }
    });
  }

  editEntity(category: Category) {
    this.categoryForm.patchValue(category);
    this.isEditForm = true;
    this.categoryDialog = true;    
  }

  deleteEntity(categoria: Category){
    this.categoria = categoria;
    this.confirmacionService.confirm({message: '¿Estas seguro de borrar la siguiente categoría: ' + this.categoria.name + '?',
    header: 'Eliminar categoría',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel:'Aceptar',
    rejectLabel:'Cancelar'
    });
  }

  delete(){
    this.categoriaService.borrarCategoria(this.categoria.id).subscribe({
      next:(res) => {
        this.messageService.add({ severity: 'success', summary: 'Borrar categoría', detail: res.message, life: 3000 });
        this.confirmacionService.close();
        this.categorias = this.categorias.filter((val) => val.id !== this.categoria.id);
      },
      error:(err) => {
        this.messageService.add({ severity: 'error', summary: 'Borrar categoría', detail: err.error.errorMessage, life: 3000 });
      }
    });

  }

  closeDialog(){
    this.confirmacionService.close();
  }

}
