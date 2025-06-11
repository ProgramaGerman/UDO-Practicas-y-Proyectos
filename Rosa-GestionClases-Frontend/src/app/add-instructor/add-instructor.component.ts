import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { InstructorServiceService } from "../services/instructor-service.service";
import Swal from 'sweetalert2';
import { MatChipsModule } from "@angular/material/chips";
import { Observable } from "rxjs";

/**
 * Clase que representa la relación entre un instructor y sus especialidades.
 */
export class InstructorEspecialidad {
  constructor(
    private idInstructor: number,
    private especialidad: string[]
  ) {}

  setIdInstructor(id: number): void {
    this.idInstructor = id;
  }

  getIdInstructor(): number {
    return this.idInstructor;
  }

  setEspecialidad(especialidad: string[]): void {
    this.especialidad.push(...especialidad);
  }

  getEspecialidad(): string[] {
    return this.especialidad;
  }

}

@Component({
  selector: "app-add-instructor",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatChipsModule],
  templateUrl: "./add-instructor.component.html",
})
export class RegistrarInstructorComponent {
  instructorForm: FormGroup;
  especialidades : string[] = []
  especialidadSeleccionada: string[] = [];
  instructores: any[] = [];
  instructorSeleccionado: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private instructorService: InstructorServiceService
  ) {
    this.instructorForm = this.fb.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      cedula: ["", Validators.required],
      telefono: ["", [Validators.required, Validators.pattern("^[0-9]{6,12}$")]],
      correo: ["", [Validators.required, Validators.email]],
    });


  }


  ngOnInit(): void {
    this.getInstructores(); // Obtener la lista de instructores al iniciar el componente
    console.log(`Instructores Cargados para su uso`);

    this.obtenerEspecialidades(); // Cargar especialidades al iniciar el componente

  }

  // Obtener especialidades desde el servicio
  obtenerEspecialidades(): void {
    this.instructorService.obtenerEspecialidades().subscribe({
      next: (especialidades) => {
        this.especialidades = especialidades;
        console.log(`Carga Exitosa`);
      },
      error: (error) => {
        console.error(`Error al cargar especialidades: ${error}`);
      }
    });
  }

  // Enviar formulario de registro de instructor
  onSubmit(): void {
    if (this.instructorForm.valid) {
      this.instructorService.postInstructor(this.instructorForm.value).subscribe({
        next: () => {
          Swal.fire({
            title: '¡Instructor registrado!',
            text: 'El instructor ha sido agregado correctamente.',
            icon: 'success',
            width: '400px',
            confirmButtonText: 'Confirmar',
            customClass: { popup: 'swal-wide' }
          }).then(() => {
            this.instructorForm.reset();
            this.router.navigate(["/instructores"]);
          });
        },
        error: () => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo registrar el instructor',
            icon: 'error',
            confirmButtonText: 'Intentar nuevamente'
          });
        }
      });
    } else {
      this.instructorForm.markAllAsTouched();
    }
  }

  // Cambiar instructor seleccionado
  onInstructorChange(event: any): void {
    this.instructorSeleccionado = event.value;
  }

  // Enviar especialidades seleccionadas para el instructor
  onsubmitEspecialidad(): void {
    const idInstructor = this.instructores.find(instructor => instructor.nombre === this.instructorSeleccionado)?.id_instructor;

    const instructorEspecialidad = new InstructorEspecialidad(
      idInstructor,
      [...this.especialidadSeleccionada]
    );

    this.instructorForm.reset();
    this.especialidadSeleccionada = [];

    this.instructorService.postInstructorEspecialidad(instructorEspecialidad).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Especialidad registrada!',
          text: 'La especialidad ha sido agregada correctamente.',
          icon: 'success',
          confirmButtonText: 'Confirmar'
        });
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo registrar la especialidad',
          icon: 'error',
          confirmButtonText: 'Intentar nuevamente'
        });
      }
    });
  }

  // Cancelar y navegar a clases
  cancelar(): void {
    this.router.navigate(["/clases"]);
  }

  // Obtener todos los instructores
  getInstructores(): void {
    this.instructorService.getInstructores().subscribe({
      next: (instructores) => {
        this.instructores = instructores;
      },
      error: (error) => {
        console.error('Error al obtener instructores:', error);
        this.instructores = [];
      }
    });
  }

  // Verificar si un campo es inválido
  campoInvalido(campo: string): boolean {
    const control = this.instructorForm.get(campo);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  // Agregar especialidad seleccionada
  onEspecialidadSelected(especialidad: string): void {
    if (especialidad && !this.especialidadSeleccionada.includes(especialidad)) {
      this.especialidadSeleccionada.push(especialidad);
      Swal.fire({
        title: 'Especialidad agregada',
        text: `La especialidad ${especialidad} ha sido agregada.`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  // Alternar especialidad en la lista
  onEspecialidadToggle(especialidad: string): void {
    if (this.especialidades.includes(especialidad)) {
      this.especialidades = this.especialidades.filter(e => e !== especialidad);
    } else {
      this.especialidades.push(especialidad);
    }
  }
}
