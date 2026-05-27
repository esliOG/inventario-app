export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  stock: number;
  fechaRegistro?: string;
  activo: boolean;
}
