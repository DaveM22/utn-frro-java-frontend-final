export interface CRUD {
     openModalForm(): void
    
      closeModalForm(): void
    
      save(): void
  
      create(): void;
  
      edit(): void;
    
      editEntity(entity:any): void
    
      deleteEntity(entity:any): void
    
      delete(): void
  
      closeDialog(): void
}