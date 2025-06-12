import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-confirmacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-elim.html',
  styleUrls: ['./modal-elim.css']
})
export class ModalConfirmacionComponent {
  /** Controla la visibilidad del modal */
  @Input() visible: boolean = false;

  /** Mensaje de confirmación a mostrar */
  @Input() mensaje: string = "¿Está seguro de eliminar este empleado?";

  /** Evento que se emite al confirmar la eliminación */
  @Output() confirmar = new EventEmitter<void>();

  /** Evento que se emite al cancelar */
  @Output() cancelar = new EventEmitter<void>();

  confirmarEliminacion(): void {
    this.confirmar.emit();
  }

  cancelarEliminacion(): void {
    this.cancelar.emit();
  }
}
