import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Propiedad } from '../../../Conexion back/models/propiedad.model';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';
import { Solicitud } from '../../../Conexion back/models/solicitud.model';
import { SolicitudService } from '../../../Conexion back/services/solicitud.service';
import { ArrendadorService } from '../../../Conexion back/services/arrendador.service';

@Component({
  selector: 'app-arrendamientos-programados',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './arrendamientos-programados.component.html',
  styleUrl: './arrendamientos-programados.component.css'
})
export class ArrendamientosProgramadosComponent {
  propiedades: Propiedad[] = [];
  llegada: string = "29/10/2024";
  partida: string = "31/10/2024";
  nombreArrendador: string = "Pepito Perez";
  nombrePropiedad: string = "Apto fantastico";
  solicitudes: Solicitud[] = [];
  propiedad?: Propiedad

  constructor(private propiedadService: PropiedadService,
    private solicitudService: SolicitudService,
    private arrendadorService: ArrendadorService
  ) { }

  ngOnInit(): void {
    // Suscribirse al BehaviorSubject de propiedades filtradas
    this.solicitudService.getSolicitudesByArrendatarioId(1).subscribe((data: Solicitud[]) => {
      this.solicitudes = data;
    });
    for (let i = 0; i < this.solicitudes.length; i++) {
      if (this.solicitudes[i].aceptacion == false) {
        this.propiedadService.getPropiedadEspecifica(this.solicitudes[i].propiedadId).subscribe((data: Propiedad) => {
          this.propiedades.push(data);
          this.propiedad = data;
        });
        if (this.propiedad) {
          this.arrendadorService.obtenerArrendador(this.propiedad.arrendadorId).subscribe((data: any) => {
            this.nombreArrendador = data.nombre;
          });
        }

      }

    }
  }

  mostrarDetalles(id: number) {
    this.propiedadService.mostrarDetalles(id);
    console.log("Se pulsó el botón detalles en el card" + id)
  }
}