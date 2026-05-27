import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:8080/api/inventario';

  constructor(private http: HttpClient) {}

  // Método 1: Listar todos
  listarTodos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Método 2: Buscar por ID
  buscarPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  // Método 3: Guardar (POST)
  guardar(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  // Método 4: Actualizar (PUT)
  actualizar(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  // Método 5: Eliminar (DELETE)
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
