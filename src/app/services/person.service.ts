import { Injectable } from '@angular/core';
import { Person } from "../models/person";
import { catchError, Observable, throwError } from "rxjs";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";

const listado: Person[] = [
  new Person(1,15, "Pedro", "Gonzalez"),
  new Person(2,23, "Juan", "Perez"),
  new Person(3,46, "Maria", "Gutierrez")
]

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  resourceUrl = environment.backendUrl + "personas"

  constructor(private http: HttpClient) { }

  findAll(): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(this.resourceUrl, {observe: "response"}).pipe(
      catchError(err => {
        console.log("Ocurrio un error");
        return throwError(() => "Paso algo");
      }),
    );
  }

  findOne(id: number): Observable<HttpResponse<any>> {
    return this.http.get<any>( this.resourceUrl + '/' + id, {observe: "response"}).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No existe la persona");
      }),
    );
  }

  crearPersona(persona: PersonDTO): Observable<any> {
    return this.http.post<any>(this.resourceUrl, persona).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No se pudo crear la persona");
      }),
    );
  }

  actualizarPersona(persona: PersonDTO): Observable<any> {
    return this.http.put<any>(this.resourceUrl + '/' + persona.id, persona).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No existe la persona");
      }),
    );
  }

  borrar(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>( this.resourceUrl + '/' + id, {observe: "response"}).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No existe la persona");
      }),
    );
  }

}

export interface PersonDTO {
  id: number,
  name: string,
  lastName: string,
  age: number
}
