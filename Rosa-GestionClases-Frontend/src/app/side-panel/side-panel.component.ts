import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: "./side-panel.component.html",
 })
export class SidebarComponent {
  menuItems = [
    { label: "Inicio",           route: "/inicio",      icon: "home"     },
    { label: "Crear Clases",     route: 'clases/crear',      icon: "calendar" },
    { label: "Registrar Instructores", route: 'instructores/registrar', icon: "users"  },
    { label: "Categoria&Especialidad", route: 'Categoria&Especialidad', icon: "categoriaEspecialidad" }, //modifiii
    { label: "Ajustes",          route: "/ajustes",     icon: "settings" },
  ];

 
}
