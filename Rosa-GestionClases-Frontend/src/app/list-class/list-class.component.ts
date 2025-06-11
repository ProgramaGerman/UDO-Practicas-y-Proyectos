import { Component, OnInit } from '@angular/core';
import { ColumnDef } from '../shared/generic-table/generic-table.component';
import { Router } from '@angular/router';
import { GenericTableComponent } from "../shared/generic-table/generic-table.component";
import { Clase } from '../interfaces/clase';
import { ClaseService } from '../services/clase.service';
import { GetDataService } from '../services/get-data.service';


@Component({
  selector: 'app-list-class',
  imports: [GenericTableComponent],
  templateUrl: './list-class.component.html',
})
export class ListClassComponent implements OnInit{
   // Configuración de paginación
    currentPage = 0;
    pageSize = 5;
    totalElements = 0;
    clases:Clase[] = [];
  
    // Definición de columnas para la tabla de clases
    columns = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'nombre', header: 'Instructor' },
      { field: 'capacidad', header: 'Capacidad' },
      { field: 'hora_inico', header: 'Horario' }
    ];
  
    /**
     * Constructor con inyección de dependencias.
     * @param claseService Servicio para obtener datos de los instructores.
     * @param router Servicio de enrutamiento para navegación.
     */
  
    constructor(private claseService: GetDataService, private router: Router) { }
  
    /** 
     * Método que se ejecuta al inicializar el componente.
     * Carga la lista de instructores desde el servicio.
     */
    ngOnInit() {
      this.loadClases();
    }
  
  
    //Obtiene los instructores paginados desde el servicio.  
    loadClases() {
      this.claseService.obtenerClasesPaginadas(this.currentPage, this.pageSize)
        .subscribe(response => {
          this.clases = response.content;
          this.totalElements = response.totalElements;
        });
    }
  
    /**
      * Actualiza la página cuando el usuario cambia de página en la tabla.
      * @param newPage Nueva página seleccionada.
    */
    onPageChange(newPage: number) {
      this.currentPage = newPage;
      this.loadClases();
    }
  
    /**
    * Maneja acciones sobre la tabla, como eliminar o modificar un instructor.
    * @param event Contiene la acción y la fila afectada.
    */
    onAction(event: { action: string, row: any }) {
      if (event.action === 'eliminar') {
        this.eliminarClase(event.row.id);
      } else if (event.action === 'modificar') {
        this.modificarClase(event.row);
      }
    }
  
    crearClase() {
      this.router.navigate(["clases/crear"]);
    }
  
    eliminarClase(id: number) {
      // Lógica para eliminar
    }
  
    modificarClase(instructor: any) {
      // Lógica para modificar
    }
  
}
