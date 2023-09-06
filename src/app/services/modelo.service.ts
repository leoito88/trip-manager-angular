import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { catchError, Observable, throwError } from "rxjs";
import { Model } from "../models/model";
import { HttpClient, HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  resourceUrl = environment.backendUrl + 'modelos'

  constructor(private http: HttpClient) { }

  findAll(): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(this.resourceUrl, {observe: "response"}).pipe(
      catchError(error => {
        console.log(error.message);
        return throwError(() => "Ocurrio un error");
      })
    )
  }

  findOne(id: number): Observable<Model> {
    return this.http.get<Model>(this.resourceUrl + '/' + id).pipe(
      catchError(err => {
        console.log(err.message);
        return throwError(() => 'Ocurrio un problema');
      })
    );
  }
}
