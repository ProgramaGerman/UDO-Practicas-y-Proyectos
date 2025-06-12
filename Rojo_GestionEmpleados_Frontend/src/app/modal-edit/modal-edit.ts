import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface EmpleadoDetalle {
  nombre: string;
  cedula: string;
  telefono: string;
  direccion: string;
  correo: string;
  rif: string;
  cargo: string;
  especialidad: string;
  fechaInicio: string;
  fechaFinalizacion: string;
  acceso: string,
  horario: string,
}

@Component({
  selector: 'app-modal-empleado-editar',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-edit.html',
  styleUrls: ['./modal-edit.css']
})
export class ModalEmpleadoEditarComponent {
  /** Controla la visibilidad del modal */
  @Input() visible: boolean = false;

  /** Objeto con los datos del empleado a editar */
  @Input() empleado: EmpleadoDetalle = {
    nombre: '',
    cedula: '',
    telefono: '',
    direccion: '',
    correo: '',
    rif: '',
    cargo: '',
    especialidad: '',
    fechaInicio: '',
    fechaFinalizacion: '',
    acceso: '',
    horario: ''
  };

  /** Evento que emite el cierre del modal */
  @Output() cerrarModal = new EventEmitter<void>();

  /** Evento que emite el objeto empleado con los cambios guardados */
  @Output() guardar = new EventEmitter<EmpleadoDetalle>();

  /**
   * Diccionario para controlar la edición de cada campo.
   * Por defecto, todos están en false para mantener el campo bloqueado.
   */
  editFields: { [key: string]: boolean } = {
    nombre: true,
    telefono: true,
    direccion: true,
    correo: true,
    rif: true,
    cargo: true,
    especialidad: true,
    fechaInicio: true,
    fechaFinalizacion: true
  };


  /**
   * Emite el objeto empleado con los cambios y cierra el modal.
   */
  guardarCambios(): void {
    // Aquí podrías agregar validaciones adicionales según sea necesario.
    this.guardar.emit(this.empleado);
    this.cerrar();
  }

  /**
   * Emite el evento para cerrar el modal.
   */
  cerrar(): void {
    this.cerrarModal.emit();
  }
}
