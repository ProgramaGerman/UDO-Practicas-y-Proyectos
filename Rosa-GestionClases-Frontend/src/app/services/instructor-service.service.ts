import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { Instructor } from '../interfaces/instructor'; // Se Trae la clase instructor
import { InstructorEspecialidad } from '../add-instructor/add-instructor.component'; // Se Trae la clase instructor especialidad

@Injectable({
  providedIn: 'root'
})
export class InstructorServiceService {
  private API_URL = 'http://localhost:8080/gimnasio-app/instructores'; // URl PARA INTERACTUAR CON EL BACK

  constructor(private http: HttpClient) {
    // No se necesita inicialización
  }

  /**
   * Envía los datos de un instructor al backend
   * @param instructor Objeto con los datos del instructor a crear
   * @returns Observable con la respuesta del servidor
   */
  postInstructor(instructor: Instructor): Observable<Instructor> {
    return this.http.post<Instructor>(this.API_URL, instructor)
      .pipe(delay(0)); // Agrega un pequeño retraso para ayudar a romper posibles dependencias circulares.
  }

  postInstructorEspecialidad(instructorEspecialidad: InstructorEspecialidad): Observable<InstructorEspecialidad> {
    return this.http.post<InstructorEspecialidad>(`${this.API_URL}/instructor-especialidades`, instructorEspecialidad) // Envía los datos de instructor especialidad al backend
      .pipe(delay(0)); // Agrega un pequeño retraso para ayudar a romper posibles dependencias circulares.
  }

  /**
   * Obtiene la lista de instructores desde el backend
   * @returns Observable con la lista de instructores
   **/
  getInstructores(): Observable<any[]> {
    const instructoresAll =  this.http.get<Instructor[]>(this.API_URL) // Obtiene todos los instructores
      .pipe(delay(0)); // Agrega un pequeño retraso para ayudar a romper posibles dependencias circulares.
    return instructoresAll;
  }

  /**
   * Actualiza los datos de un instructor
   * @param id ID del instructor a actualizar
   * @param instructor Datos actualizados del instructor
   * @returns Observable con la respuesta del servidor
   */
  updateInstructor(id: number, instructor: Instructor): Observable<Instructor> {
    return this.http.put<Instructor>(`${this.API_URL}/${id}`, instructor)
      .pipe(delay(0));
  }

  /**
   * Elimina un instructor
   * @param id ID del instructor a eliminar
   * @returns Observable con la respuesta del servidor
   */
  deleteInstructor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`)
      .pipe(delay(0)); // Add a small delay to help break potential circular dependencies
  }


  obtenerEspecialidades(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}/especialidades`)
      .pipe(delay(0)); // Agrega un pequeño retraso para ayudar a romper posibles dependencias circulares.
  }
}
