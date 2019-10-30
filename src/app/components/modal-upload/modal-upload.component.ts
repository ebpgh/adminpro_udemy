import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {

  oculto: string = "";
  imagenSubir: File;
  imagenTemp: string;

  constructor(
      public _subirArchivoService: SubirArchivoService,
      public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }


  seleccionImagen( fichero ) {

    if (!fichero) {
      this.imagenSubir = null; 
      return;
    }
    // comprobación de que el fichero es una imagen (por el tipo)
    if (fichero.type.indexOf('image') < 0) {
      swal('Fichero no válido', 'El fichero seleccionado no es una imagen','error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir  = fichero;
    let reader = new FileReader();
    reader.readAsDataURL( fichero );

    reader.onloadend = () => this.imagenTemp = reader.result.toString();
    

  }

  subirImagen() {
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)

      .then(resp => {
        console.log(resp);
        this._modalUploadService.notificacion.emit( resp );
        this.cerrarModal();
      })

      .catch( err => {
          console.log('Error en la carga de la imagen...');
      });
  }

}
