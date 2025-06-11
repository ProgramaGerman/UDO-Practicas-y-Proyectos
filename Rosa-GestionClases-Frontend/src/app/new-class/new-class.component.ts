import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder,type FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { Categoria } from '../interfaces/categoria';
import { Instructor } from '../interfaces/instructor';
import { Sala } from '../interfaces/sala';
import { ClaseService } from '../services/clase.service';
import { GetDataService } from '../services/get-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-class',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    CommonModule,
  ],
  templateUrl: './new-class.component.html',
})
export class NewClassComponent implements OnInit {
  // Definimos el formulario para la clase
  claseForm: FormGroup;

  // Arrays para almacenar datos provenientes de la base de datos.
  categorias: Categoria[] = [];
  salas: Sala[] = [];
  instructores: Instructor[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private claseService: ClaseService,// Inyectamos el servicio para crear las clases
    private getData: GetDataService
  ) {
    // Inicializamos el formulario con sus controles y validadores
    this.claseForm = this.fb.group({
      nombre: ["", Validators.required],
      descripcion: [""],
      id_categoria: [null as number | null, Validators.required],
      id_sala: [null as number | null, Validators.required],
      capacidad: ["", [Validators.required]],
      id_instructor: [null as number | null, Validators.required],
    });
  }

  ngOnInit(): void {
    // Llamadas a los métodos del servicio para cargar los datos.

    this.getData.getCategorias().subscribe({
      next: data => {
        this.categorias = data;
      },
      error: error => {
        console.error('Error al cargar las categorias')
      }

    });

    this.getData.getSalas().subscribe({
      next: data => {
        this.salas = data;
      },
      error: error => {
        console.error('Error al cargar las Salas')
      }
    });

    this.getData.getInstructores().subscribe({
      next: data => {
        this.instructores = data;
      },
      error: error => {
        console.error('Error al cargar los Instructores')
      }
    })
  }

  onSubmit() {
    if (this.claseForm.valid) {
      console.log("Datos enviados:", this.claseForm.value);

      // Aquí llamarías al servicio para enviar los datos al backend.
      this.claseService.postClase(this.claseForm.value).subscribe({
        next: (response) => {
          Swal.fire({
            title: '¡Clase registrada!',
            text: 'La nueva clase ha sido creada correctamente.',
            icon: 'success',
            width: '400px',
            confirmButtonText: 'Continuar',
            customClass: {
              popup: 'swal-wide' // Clase CSS personalizada (definida en tu CSS)
            }
          }).then(() => {
            this.claseForm.reset();
            this.router.navigate(['/clases']);
          });
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo registrar la clase',
            icon: 'error',
            confirmButtonText: 'Intentar nuevamente'
          });
        }
      });

    } else {
      // Si el formulario es inválido, marcar todos los campos para mostrar errores
      this.claseForm.markAllAsTouched();
    }
  }

  cancelar() {
    // Navega a la ruta correspondiente para cancelar (por ejemplo, la lista de clases)
    this.router.navigate(['/clases']);
  }
}

