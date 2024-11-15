import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Arrendatario } from '../models/arrendatario.model';

@Injectable({
  providedIn: 'root'
})
export class ArrendatarioService {
  private apiUrl = 'http://localhost:8080/api/arrendatario';

  constructor(private http: HttpClient) {}

  obtenerArrendatario(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/arrendatario/${id}`);
  }

  crearArrendatario(arrendatarioData: Arrendatario): Observable<any> {
    return this.http.post(`${this.apiUrl}/crearArrendatario`, arrendatarioData);
  }

  modificarUsuarioArrendatario(arrendatario: Partial<Arrendatario>, id: number): Observable<any> {
    // Excluir id, solicitudes, y calificaciones del objeto antes de enviarlo
    const { id: _, solicitudes, calificaciones, ...dataToUpdate } = arrendatario;
    
    return this.http.put(`${this.apiUrl}/actualizarArrendatario/${id}`, dataToUpdate);
  }
}
