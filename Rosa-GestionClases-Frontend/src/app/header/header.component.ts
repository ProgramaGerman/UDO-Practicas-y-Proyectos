import { Component } from "@angular/core"
import { RouterLink, RouterLinkActive } from "@angular/router"
import { CommonModule } from "@angular/common"


@Component({
  selector: "app-header",
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: "./header.component.html",
 })
export class HeaderComponent {
 
  miembro = "Usuario"
  menuItems = [
    { label: "Inicio", route: "/inicio" },
    { label: "Clases", route: "/clases" },
    { label: "Instructores", route: "/instructores" },
   ];

  
}
