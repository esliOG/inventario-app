import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoListaComponent } from './components/producto-lista/producto-lista.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
  { path: 'productos', component: ProductoListaComponent },
  { path: 'productos/nuevo', component: ProductoFormComponent },
  { path: 'productos/editar/:id', component: ProductoFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
