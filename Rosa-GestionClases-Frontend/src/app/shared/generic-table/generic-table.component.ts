import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

// Definición de una interfaz para las columnas de la tabla
export interface ColumnDef {
  field: string;
  header: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './generic-table.component.html',
  imports: [CommonModule]
})
export class GenericTableComponent implements OnChanges {
  @Input() data: any[] = [];          // Datos paginados del backend
  @Input() columns: ColumnDef[] = []; // Definiciones de las columnas
  @Input() actions: string[] = [];    // Lista de acciones disponibles por fila (ej: ['modificar', 'eliminar'])
  @Input() totalElements = 0;         // Total de registros desde el backend
  @Input() pageSize = 5;              // Tamaño de la página (número de filas por página)
  @Input() currentPage = 0;           // Página actual

  // Eventos de salida
  @Output() pageChanged = new EventEmitter<number>();
  @Output() actionClicked = new EventEmitter<{ action: string, row: any }>();

  // Calcula el total de páginas
  get totalPages(): number {
    return Math.ceil(this.totalElements / this.pageSize);
  }

  // Actualiza cuando cambian los inputs
  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalElements'] || changes['pageSize']) {
      this.currentPage = 0;
    }
  }

  // Manejo de cambio de página
  changePage(newPage: number) {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.currentPage = newPage;
      this.pageChanged.emit(newPage);
    }
  }


  // Manejo de acciones
  onAction(action: string, row: any) {
    this.actionClicked.emit({ action, row });
  }
}
