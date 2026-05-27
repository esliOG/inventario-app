import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
  styleUrls: ['./producto-lista.component.scss']
})
export class ProductoListaComponent implements OnInit {
  productos: Producto[] = [];
  cargando = false;
  mensajeExito = '';
  mensajeError = '';

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.cargando = true;
    this.productoService.listarTodos().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
      },
      error: (err) => {
        this.mensajeError = 'Error al cargar los productos. Verifique la conexión con el servidor.';
        this.cargando = false;
      }
    });
  }

  editarProducto(id: number): void {
    this.router.navigate(['/productos/editar', id]);
  }

  eliminarProducto(producto: Producto): void {
    const confirmacion = confirm(`¿Está seguro de eliminar el producto "${producto.nombre}"?`);
    if (confirmacion) {
      this.productoService.eliminar(producto.id!).subscribe({
        next: () => {
          this.mensajeExito = `Producto "${producto.nombre}" eliminado correctamente.`;
          this.cargarProductos();
          setTimeout(() => this.mensajeExito = '', 3000);
        },
        error: (err) => {
          this.mensajeError = 'Error al eliminar el producto.';
          setTimeout(() => this.mensajeError = '', 3000);
        }
      });
    }
  }

  nuevoProducto(): void {
    this.router.navigate(['/productos/nuevo']);
  }

  cerrarAlerta(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
  }
}
