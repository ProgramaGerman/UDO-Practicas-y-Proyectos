import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from 'sweetalert2'; // para mostrar mensajes 
import { CategoriaEspecialidad } from "../services/catespecialidad.service";


/**
 * @Component Decorator
 * Define los metadatos para el RegistrarCategoria&EspecialidadComponent.
 */
@Component({
  selector: "app-categoria&Especialidad",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./add-catespecial.component.html",
})

/**
 * RegistrarCategoriaEspecialidadComponent Class
 * Este componente es responsable de manejar el registro de nuevas categorias he especialidades.
 * Incluye un formulario para capturar los detalles de la categoria y la especialidad y utiliza un servicio para enviar los datos al backend.
 */
export class AgregarCategoriaEspecialidad {
  /**
   * instructorForm: FormGroup
   * Define el grupo de formularios para el formulario del instructor.
   */
  categoriaForm: FormGroup;
  especialidadForm: FormGroup;

  /**
   * Constructor para el RegistrarInstructorComponent.
   * @param {FormBuilder} fb - El servicio FormBuilder para crear el formulario.
   * @param {Router} router - El servicio Router para la navegación.
   * @param {categoriaServicio} CategoriaEspecialidad - El CategoriaEspecialidad para realizar solicitudes HTTP.
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoriaServicio: CategoriaEspecialidad
  ) {
    // Inicializa el categoriaForm  y especialidadForm con controles de formulario y validadores
    this.categoriaForm = this.fb.group({
      nombre: ["", Validators.required],
    });

    this.especialidadForm = this.fb.group({
      nombre: ["", Validators.required],
    });
  }

  /**
   * onSubmit Method
   * Maneja el envío del formulario de la categoria.
   * Comprueba si el formulario es válido, envía los datos al backend y navega a la lista de categorias.
   */
  onSubmit() {
    if (this.categoriaForm.valid) {
      // Imprime los datos del formulario por consola
      console.log(this.categoriaForm.value);
     
      // Enviar datos al backend
      this.categoriaServicio.postCategoria(this.categoriaForm.value).subscribe({
        next: (response) => {
          Swal.fire({
            title: '¡Categoria registrada!',
            text: 'La categoria ha sido registrada correctamente.',
            icon: 'success',
            width: '400px', // Cambia el ancho del moda
            confirmButtonText: 'Confirmar',
            customClass: {
              popup: 'swal-wide' // Clase CSS personalizada
            }
          }).then(() => {
            this.categoriaForm.reset();
            this.router.navigate(["/Categoria&Especialidad"]);
          });
        },
        error: () => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo registrar la categoria',
            icon: 'error',
            confirmButtonText: 'Intentar nuevamente'
          });
        }
      });
    } else {
      this.categoriaForm.markAllAsTouched();
    }
  }

  onEnviar() {
    if (this.especialidadForm.valid) {
      // Imprime los datos del formulario por consola
      console.log(this.especialidadForm.value);

      // Enviar datos de la especialidad al backend
      this.categoriaServicio.postEspecialidad(this.especialidadForm.value).subscribe({
        next: (response) => {
          Swal.fire({
            title: '¡Especialidad registrada!',
            text: 'La especialidad ha sido registrada correctamente.',
            icon: 'success',
            width: '400px', // Cambia el ancho del moda
            confirmButtonText: 'Confirmar',
            customClass: {
              popup: 'swal-wide' // Clase CSS personalizada
            }
          }).then(() => {
            this.especialidadForm.reset();
            this.router.navigate(["/Categoria&Especialidad"]);
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
    } else {
      this.especialidadForm.markAllAsTouched();
    }
  }

  cancelar() {
    this.router.navigate(["/instructor"]);
  }


  /**
   * campoInvalido Method
   * Método de ayuda para determinar si un campo del formulario no es válido y debe mostrar un error.
   * @param {string} campo - El nombre del campo del formulario para verificar.
   * @returns {boolean} - True si el campo no es válido y debe mostrar un error, false de lo contrario.
   */
  campoInvalido(campo: string): boolean {
    const control = this.categoriaForm.get(campo);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
