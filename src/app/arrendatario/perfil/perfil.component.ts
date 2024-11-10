import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Arrendatario } from '../../../Conexion back/models/arrendatario.model';
import { ArrendatarioService } from '../../../Conexion back/services/arrendatario.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})

export class PerfilComponent {
  arrendatario: Arrendatario = {
    id: 1, // Ejemplo de ID; ajusta este valor según sea necesario
    usuario: 'usuario123',
    contrasena: 'contraseña123',
    nombre: 'Nombre de Ejemplo',
    status: 1,
    correo: 'correo@example.com',
    solicitudes: [],
    calificaciones: []
  };
  
  nombre: string = 'Nombre de Ejemplo';
  usuario: string = 'usuario123';
  contrasena: string = 'contraseña123';
  nuevaContrasena: string = '';
  correo: string = 'correo@example.com';

  showModal: boolean = false;
  errorContrasena: boolean = false;


  constructor(
    private router: Router,
    private arrendatarioService: ArrendatarioService
  ){};

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  deleteAccount(): void {
    alert("Cuenta eliminada");
    this.closeModal();
  }

  saveChanges(): void {
    if (this.nuevaContrasena && this.nuevaContrasena !== this.arrendatario.contrasena) {
      this.errorContrasena = true;
      return;
    }
    this.errorContrasena = false;

    // Si hay una nueva contraseña, la asignamos al objeto arrendatario
    if (this.nuevaContrasena) {
      this.arrendatario.contrasena = this.nuevaContrasena;
    }

    // Llamada al servicio para actualizar el arrendatario
    this.arrendatarioService.modificarUsuarioArrendatario(this.arrendatario, this.arrendatario.id)
      .subscribe({
        next: (response) => {
          alert("Cambios guardados exitosamente");
        },
        error: (err) => {
          console.error('Error al actualizar arrendatario:', err);
          alert("Hubo un error al guardar los cambios");
        }
      });
      this.router.navigate(['/arrendatario']);
    }

  changeImage(): void {
    console.log("Cambiar imagen de perfil");
  }
}
