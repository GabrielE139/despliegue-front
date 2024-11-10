import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Propiedad } from '../../../Conexion back/models/propiedad.model';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';
import { CardArrendadorComponent } from '../card-arrendador/card-arrendador.component';


@Component({
  selector: 'app-propiedades-arrendador',
  standalone: true,
  imports: [CommonModule, CardArrendadorComponent],
  templateUrl: './propiedades-arrendador.component.html',
  styleUrl: './propiedades-arrendador.component.css'
})
export class PropiedadesArrendadorComponent implements OnInit {
  descripcionGenerica: string = "Esta es una descripción de la propiedad.";
  imagenGenerica: string = "https://picsum.photos/200/300";
  propiedades: Propiedad[] = [];
  idArrendador: number = 0;

  constructor(private propiedadService: PropiedadService) {}

  ngOnInit(): void {
    this.getUsuarioDatos();
    if (this.idArrendador) {
      this.propiedadService.getPropiedadesArrendador(this.idArrendador).subscribe((data: Propiedad[]) => {
        this.propiedades = data;
      });
    }
  }

  getUsuarioDatos(): void {
    // Verificar si sessionStorage está disponible
    if (typeof sessionStorage !== 'undefined') {
      const usuarioData = sessionStorage.getItem('usuario');
      if (usuarioData) {
        const usuario = JSON.parse(usuarioData);
        if (usuario.tipoUsuario === 'arrendador') {
          this.idArrendador = usuario.id;
        }
      }
    }
  }

}
