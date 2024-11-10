import { Component, Input } from '@angular/core';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';

@Component({
  selector: 'app-card-arrendador',
  standalone: true,
  imports: [],
  templateUrl: './card-arrendador.component.html',
  styleUrl: './card-arrendador.component.css'
})
export class CardArrendadorComponent {
  @Input() nombre: string = '';
  @Input() descripcion: string = '';
  @Input() imagenUrl: string = '';

  @Input() id: number = 0;

  constructor(private propiedadDetalleService: PropiedadService) { }

  verSolicitudes() {
    //this.propiedadDetalleService.mostrarDetalles(this.id);
  }

}
