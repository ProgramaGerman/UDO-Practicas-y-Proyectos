import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../interfaces/categoria';
import { delay, Observable } from 'rxjs';
import { Sala } from '../interfaces/sala';
import { Instructor } from '../interfaces/instructor';
import { PageResponse } from '../interfaces/instructor-paginable';
import { Clase } from '../interfaces/clase';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  // URls PARA INTERACTUAR CON EL BACKEND
  private categoria_URL = 'http://localhost:8080/gimnasio-app/categorias';
  private sala_URL = 'http://localhost:8080/gimnasio-app/salas';
  private instructor_URL = 'http://localhost:8080/gimnasio-app/instructores';
  private InstructorPaginado_URl = 'http://localhost:8080/gimnasio-app/instructoresPaginados';
  private clasesPaginado_URl = 'http://localhost:8080/gimnasio-app/clasesPaginadas';

  constructor(private http: HttpClient) {
    
  }

  // OBTENER LA LISTA DE CATEGORIAS
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.categoria_URL)
      .pipe(delay(0)); // Agrega un pequeño retraso para ayudar a romper posibles dependencias circulares.
  }

  // OBTENER LA LISTA DE SALAS
  getSalas(): Observable<Sala[]> {
    return this.http.get<Sala[]>(this.sala_URL)
      .pipe(delay(0));
  }

  // OBTENER LA LISTA DE INSTRUCTORES
  getInstructores(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.instructor_URL)
      .pipe(delay(0));
  }

  //OBTENER LISTA DE INSTRUCTORES--PAGINADOS PARA LA TABLA INSTRUCTOR
  obtenerInstructoresPaginados(page: number, size: number): Observable<PageResponse<Instructor>>{
    return this.http.get <PageResponse<Instructor>>(
      `${this.InstructorPaginado_URl}?page=${page}&size=${size}`);
  }

  //OBTENER LISTA DE INSTRUCTORES--PAGINADOS PARA LA TABLA INSTRUCTOR
  obtenerClasesPaginadas(page: number, size: number): Observable<PageResponse<Clase>> {
    return this.http.get<PageResponse<Clase>>(
      `${this.clasesPaginado_URl}?page=${page}&size=${size}`);
  }

  //Actualizar
  updateItem(id: number, data: Instructor): Observable<Instructor> {
    return this.http.put<Instructor>(`${this.InstructorPaginado_URl}/${id}`, data);
  }
  // Elimininar
  deleteItem(id: number): Observable<Instructor> {
    return this.http.delete<Instructor>(`${this.InstructorPaginado_URl}/${id}`);
  }
}
