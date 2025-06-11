import { Component, OnInit } from '@angular/core';
import { ColumnDef } from '../shared/generic-table/generic-table.component';
import { Router } from '@angular/router';
import { GenericTableComponent } from "../shared/generic-table/generic-table.component";
import { GetDataService } from '../services/get-data.service';
import { Instructor } from '../interfaces/instructor';
import { catchError, of } from 'rxjs';

/**
 * Componente para listar instructores en una tabla con paginación.
 * Permite visualizar, agregar, modificar y eliminar instructores.
 */
@Component({
  selector: 'app-instructors',
  templateUrl: './list-instructor.component.html',
  standalone: true,
  imports: [GenericTableComponent], // Importa la tabla genérica para mostrar datos
})
export class ListInstructorComponent implements OnInit {
  // Configuración de paginación
  currentPage = 0;
  pageSize = 5;
  totalElements = 0;
  instructors: Instructor[] = [];

  // Definición de columnas para la tabla de instructores
  cols = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'apellido', header: 'Apellido' },
    { field: 'telefono', header: 'Teléfono' },
    { field: 'cedula', header: 'Cédula' }
  ];

  /**
   * Constructor con inyección de dependencias.
   * @param instructoresService Servicio para obtener datos de los instructores.
   * @param router Servicio de enrutamiento para navegación.
   */

  constructor(private instructoresService: GetDataService, private router: Router) { }

  /** 
   * Método que se ejecuta al inicializar el componente.
   * Carga la lista de instructores desde el servicio.
   */
  ngOnInit() {
    this.loadInstructors();
  }


  //Obtiene los instructores paginados desde el servicio.  
  loadInstructors() {
    this.instructoresService.obtenerInstructoresPaginados(this.currentPage, this.pageSize)
      .subscribe(response => {
        this.instructors = response.content;
        this.totalElements = response.totalElements;
      });
  }

  /**
    * Actualiza la página cuando el usuario cambia de página en la tabla.
    * @param newPage Nueva página seleccionada.
  */
  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.loadInstructors();
  }

  /**
  * Maneja acciones sobre la tabla, como eliminar o modificar un instructor.
  * @param event Contiene la acción y la fila afectada.
  */
  onAction(event: { action: string, row: any }) {
    if (event.action === 'eliminar') {
      this.eliminarInstructor(event.row.id);
      console.log('Eliminar:', event.row);

    } else if (event.action === 'modificar') {
      this.modificarInstructor(event.row);
      console.log('Editar:', event.row);


    }
  }

  Registrar_instructor() {
    this.router.navigate(["/instructores/registrar"]);
  }

  eliminarInstructor(id: number) {
    // Lógica para eliminar
  }

  modificarInstructor(instructor: any) {
    // Lógica para modificar
  }
}
