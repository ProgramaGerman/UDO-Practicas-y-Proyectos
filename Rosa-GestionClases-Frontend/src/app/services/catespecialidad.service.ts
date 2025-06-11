import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { Categoria } from '../interfaces/categoria';
import { Especialidad } from '../interfaces/especialidad';

@Injectable({
  providedIn: 'root'
})
export class CategoriaEspecialidad {
  private categoria_URL = 'http://localhost:8080/gimnasio-app/categorias'; // URl PARA INTERACTUAR CON EL BACK
  private especialidad_URL = 'http://localhost:8080/gimnasio-app/especialidades'
  constructor(private http: HttpClient) {
    // No se necesita inicialización
  }

  /**
   * Envía los datos de una categoria al backend
   * @param categoria Objeto con los datos de la categoria a crear
   * @returns Observable con la respuesta del servidor
   */
  postCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.categoria_URL, categoria)
      .pipe(delay(0)); // Agrega un pequeño retraso para ayudar a romper posibles dependencias circulares.
  }

  // Post para registrar especialidad
  postEspecialidad(especialidad: Especialidad): Observable<Especialidad> {
    return this.http.post<Especialidad>(this.especialidad_URL, especialidad)
      .pipe(delay(0)); // Agrega un pequeño retraso para ayudar a romper posibles dependencias circulares.
  }

}