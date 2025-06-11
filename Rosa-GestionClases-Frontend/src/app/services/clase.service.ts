import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clase } from '../interfaces/clase';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {
  private clase_URL = 'http://localhost:8080/gimnasio-app/clases'; // URl PARA INTERACTUAR CON EL BACK

  constructor(private http: HttpClient) { }

    /**
     * Obtiene todas las clases
     * @returns Observable con la lista de clases
    */
    getClases(): Observable<Clase[]> {
      return this.http.get<Clase[]>(this.clase_URL)
        .pipe(delay(0)); // Agrega un pequeño retraso para ayudar a romper posibles dependencias circulares.
    }
  
    /**
      * Envía los datos de una clase al backend
      * @param clase Objeto con los datos de la clase a crear
      * @returns Observable con la respuesta del servidor
      */
     postClase(clase: Clase): Observable<Clase> {
       return this.http.post<Clase>(this.clase_URL,clase)
         .pipe(delay(0)); // Agrega un pequeño retraso para ayudar a romper posibles dependencias circulares.
     }
}
