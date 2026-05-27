import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.scss']
})
export class ProductoFormComponent implements OnInit {
  productoForm!: FormGroup;
  esEdicion = false;
  productoId?: number;
  cargando = false;
  guardando = false;
  mensajeError = '';

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.esEdicion = true;
      this.productoId = +id;
      this.cargarProducto(this.productoId);
    }
  }

  inicializarFormulario(): void {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      precio: [null, [Validators.required, Validators.min(0)]],
      stock: [null, [Validators.required, Validators.min(0)]],
      activo: [true]
    });
  }

  cargarProducto(id: number): void {
    this.cargando = true;
    this.productoService.buscarPorId(id).subscribe({
      next: (producto) => {
        this.productoForm.patchValue({
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          categoria: producto.categoria,
          precio: producto.precio,
          stock: producto.stock,
          activo: producto.activo
        });
        this.cargando = false;
      },
      error: () => {
        this.mensajeError = 'Error al cargar el producto.';
        this.cargando = false;
      }
    });
  }

  guardar(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const producto: Producto = this.productoForm.value;

    if (this.esEdicion && this.productoId) {
      this.productoService.actualizar(this.productoId, producto).subscribe({
        next: () => {
          this.guardando = false;
          this.router.navigate(['/productos']);
        },
        error: () => {
          this.mensajeError = 'Error al actualizar el producto.';
          this.guardando = false;
        }
      });
    } else {
      this.productoService.guardar(producto).subscribe({
        next: () => {
          this.guardando = false;
          this.router.navigate(['/productos']);
        },
        error: () => {
          this.mensajeError = 'Error al guardar el producto.';
          this.guardando = false;
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/productos']);
  }

  // Helpers para validación en template
  campoInvalido(campo: string): boolean {
    const control = this.productoForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }

  get f() {
    return this.productoForm.controls;
  }
}
