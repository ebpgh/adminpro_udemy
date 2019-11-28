import { Component, OnInit } from '@angular/core';

import { Usuario } from 'src/app/models/usuario.model';
import { Hospital } from 'src/app/models/hospital.model';
import { UsuarioService } from 'src/app/services/service.index';
import { HospitalService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

// import swal from 'sweetalert';
  
declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {
  
  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean;
  
    constructor(
      public _usuarioService: UsuarioService,
      public _hospitalService: HospitalService,
      public __modalUploadService: ModalUploadService
    ) { }
  
    ngOnInit() {
      this.cargarHospilates();
      // A continuación, no suscribimos a la notificación de la actualización de imágenes para que cada vez que 
      // se actualice una imagen, se rercague la lista de usuarios que se muestra en la tabla.
      this.__modalUploadService.notificacion
          .subscribe( resp => this.cargarHospilates());
    }
  
    mostrarModal(id: string) {
      this.__modalUploadService.mostrarModal( 'hospitales', id);
    }
  
    cargarHospilates() {
  
      this.cargando = true;
      this._hospitalService.cargarHospitales( this.desde )
        .subscribe( (resp: any) => {
          this.totalRegistros = resp.total;
          this.hospitales = resp.hospitales;
          this.cargando = false;
        });  
    }
  
    cambiarDesde( valor: number) {
  
      let desde = this.desde + valor;
  
      if (desde >= this.totalRegistros) return;
      if (desde < 0) return;
  
      this.desde += valor;
      this.cargarHospilates();
  
    }
  
  buscarHospitales( termino: string) {
  
    if (termino.length <=0) {
      this.cargarHospilates();
      return;
    }
  
  this.cargando=true;
  
    this._hospitalService.buscarHospitales( termino )
      .subscribe( (hospitales: Hospital[]) => {
        this.hospitales = hospitales;
        this.cargando=false;
  
      });  
  }
  
  borrarHospital( hospital: Hospital ) {
  
    swal({
      title: '¿Está seguro?',
      text: 'Una vez eliminado el hospital ' + hospital.nombre + ' no se podrá recuperar',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {
  
      console.log(borrar)
  
      if (borrar) {
            this._hospitalService.borrarHospital(hospital._id)
              .subscribe( resp => {
                console.log(resp);
                this.cargarHospilates();
              })
        };
  
    });
  
  }
  
crearHospital() {

    swal({
      title: 'Crear hospital',
      text: 'Indique el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    })
    .then ( (valor: string) => {

        if ( !valor || valor.length === 0 ) return;

        this._hospitalService.crearHospital( valor ).subscribe( () => this.cargarHospilates());

    })

}

  guardarHospital( hospital: Hospital ) {
    this._hospitalService.actualizarHospital(hospital)
      .subscribe( resp => {
        console.log(resp);
        this.cargarHospilates();
      })
  }
  
  }
  
