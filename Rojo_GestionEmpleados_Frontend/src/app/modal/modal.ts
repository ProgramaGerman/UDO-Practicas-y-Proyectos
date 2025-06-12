import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modal-empleado',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './modal.html',
  styleUrls: ['./modal.css']
})
export class ModalEmpleadoComponent {
  /** Controla si el modal está visible */
  @Input() visible: boolean = false;

  /** Evento para cerrar el modal */
  @Output() cerrarModal = new EventEmitter<void>();

  cerrar(): void {
    this.cerrarModal.emit();
  }
}
