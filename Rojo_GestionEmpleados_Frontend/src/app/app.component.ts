import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ModalEmpleadoComponent } from './modal/modal';
import { ModalEmpleadoEditarComponent, EmpleadoDetalle } from './modal-edit/modal-edit';
import { ModalConfirmacionComponent } from './modal-elim/modal-elim';

/**
 * Interfaz que define la estructura de un empleado.
 */
interface Empleado {
  cedula: string,
  nombre: string;
  cargo: string;
  acceso: string;
  horario: string;
  especialidad: string;
  telefono: string,
  direccion: string,
  correo: string,
  rif: string,
  fechaInicio:string,
  fechaFinalizacion: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ModalEmpleadoComponent, ModalEmpleadoEditarComponent, ModalConfirmacionComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'Pryecto Gym Equipo Rojo';

  /**
   * Array de empleados para ejemplo. 
   */
  empleados: Empleado[] = [
    { 
      nombre: 'Juan Pérez', 
      cargo: 'Entrenador', 
      acceso: 'A', 
      horario: '8:00 AM - 12:00 PM', 
      especialidad: 'Funcional' ,
      cedula: '16515611561561',      
      telefono: '',
      direccion: '',
      correo: '',
      rif: '',
      fechaInicio:'',
      fechaFinalizacion: ''

    },
    {
      nombre: 'María González',
      cargo: 'Mantenimiento',
      acceso: 'B',
      horario: '1:00 PM - 5:00 PM',
      especialidad: 'Limpieza',
      cedula: '45645645',       
      telefono: '',
      direccion: '',
      correo: '',
      rif: '',
      fechaInicio:'',
      fechaFinalizacion: ''
    },
    {
      nombre: 'Carlos Sosa',
      cargo: 'Administración',
      acceso: 'C',
      horario: '9:00 AM - 6:00 PM',
      especialidad: 'Recursos Humanos',
      cedula: '521561515',       
      telefono: '',
      direccion: '',
      correo: '',
      rif: '',
      fechaInicio:'',
      fechaFinalizacion: ''
    }
  ];

  // Propiedades para el modal de edición: abrir y cerrar ventana emergente en editar
  visibleModalEditar: boolean = false;
  empleadoSeleccionado: EmpleadoDetalle = { 
    nombre: '',
    cedula: '',       
    telefono: '',
    direccion: '',
    correo: '',
    rif: '',
    acceso: '',
    horario: '',
    cargo: '',
    especialidad: '',
    fechaInicio: '',
    fechaFinalizacion: ''
  };

  // Propiedad para el modal de agregar: abrir y cerrar ventana emergente en agregar
  visibleModal: boolean = false;

  constructor() { }    //:)
  
  ngOnInit(): void {
    // Aquí se puede implementar la carga de datos desde un API o servicio.
  }

  /**
   * Método para editar información de un empleado.
   * Este método ahora abre el modal de edición.
   * @param empleado   Objeto con la información del empleado. :)
   */
  editarEmpleado(empleado: Empleado): void {
    console.log('Editar empleado:', empleado);
    // Abre el modal de edición con el empleado seleccionado.
    this.abrirModalEditar(empleado);
  }

  /**
   * Método para eliminar un empleado.
   * @param empleado Objeto con la información del empleado.
   */
   // Propiedad para controlar la visibilidad del modal de confirmación
  visibleModalConfirmacion: boolean = false;

  // Mensaje que se mostrará en el modal de confirmación
  mensajeConfirmacion: string = "¿Está seguro de eliminar este empleado?";

  // Guarda temporalmente el empleado que se desea eliminar
  empleadoAEliminar: Empleado | null = null;

  // Método que se invoca cuando se hace clic en "Eliminar" en la tabla
  eliminarEmpleado(empleado: Empleado): void {
    console.log('Eliminar empleado:', empleado);
    this.empleadoAEliminar = empleado;
    this.visibleModalConfirmacion = true;
  }

  // Se ejecuta al confirmar la eliminación, 
  confirmarEliminacion(): void {
    if (this.empleadoAEliminar) {
      this.empleados = this.empleados.filter(e => e.cedula !== this.empleadoAEliminar!.cedula);
      this.empleadoAEliminar = null;
    }
    this.visibleModalConfirmacion = false;
  }

  // Se ejecuta al cancelar la eliminación y cierra la ventana.
  cancelarEliminacion(): void {
    this.empleadoAEliminar = null;
    this.visibleModalConfirmacion = false;
  }

  /**
   * Al presionar el botón "Agregar", el modal se vuelve visible.
   */
  agregarEmpleado(): void {
    this.visibleModal = true;
  }

  /**
   * Al emitir el evento de cierre desde el modal de agregar, se oculta.
   */
  cerrarModal(): void {
    this.visibleModal = false;
  }
  
  // Métodos para el modal de edición:

  /**
   * Abre el modal de edición con los datos del empleado seleccionado.
   * Se realiza una copia del empleado usando el operador spread.
   * @param empleado Objeto con la información del empleado.
   */
  abrirModalEditar(empleado: Empleado): void {

    console.log('Empleado recibido para editar:', empleado); // Verifica la propiedad 'cedula'
    this.empleadoSeleccionado = { ...empleado } as EmpleadoDetalle;
    this.visibleModalEditar = true;


  }

  /**
   * Cierra el modal de edición sin guardar cambios.
   */
  cerrarModalEditar(): void {
    this.visibleModalEditar = false;
  }

  /**
   * Recibe el objeto del empleado editado y actualiza la lista.
   * Se identifica al empleado de manera única (por ejemplo, por 'cedula').
   * @param empleadoEditado Objeto con el empleado modificado.
   */
  guardarEmpleado(empleadoEditado: EmpleadoDetalle): void {
    const indice = this.empleados.findIndex(e => e.cedula === empleadoEditado.cedula);
    if (indice > -1) {
      this.empleados[indice] = empleadoEditado;
    }
    this.visibleModalEditar = false;
  }
}
