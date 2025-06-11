import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NewClassComponent } from './new-class/new-class.component';
import { Component } from '@angular/core';
import { SidebarComponent } from './side-panel/side-panel.component';
import { RegistrarInstructorComponent } from './add-instructor/add-instructor.component';
import { ListInstructorComponent } from './list-instructor/list-instructor.component';
import { ListClassComponent } from './list-class/list-class.component';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { AgregarCategoriaEspecialidad } from './categoria&Especialidad/agregar-categ-especialidad';

export const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'clases', component: ListClassComponent },
  {
    path: 'clases/crear',
    loadComponent: () => import('./new-class/new-class.component').then(m => m.NewClassComponent)
  },
  { path: 'instructores', component: ListInstructorComponent },

  {path: 'Categoria&Especialidad', component: AgregarCategoriaEspecialidad},
  {
    // Carga diferida --> se cargar dinamicamente al acceder a la ruta mejorando el rendimiento
    path: 'instructores/registrar',
    loadComponent: () => import('./add-instructor/add-instructor.component').then(m => m.RegistrarInstructorComponent)
  },
  // Redireccion por defecto
  { path: '', redirectTo: 'inicio', pathMatch: 'full' }
];


