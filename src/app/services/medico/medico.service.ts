import { Injectable } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import  'rxjs/add/operator/map'; // se podría haber hecho un import de 'rxjs/Rx' pero esto se considera
// mala práctiva porque es una librería muy grande, por eso para importar el map se hace un import
// de 'rxjs/add/operator/map'
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  medico: Medico = null;

  constructor(
    public http: HttpClient,  // Necesario para las peticiones hhtp a los servicios
    public router:Router,
    public _usuarioService: UsuarioService,
    public _subirArchivoService: SubirArchivoService
  ) { 
  }

 
  actualizarHospital( hospital: Hospital) {

    let url = URL_SERVICIOS + 'hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;
    
    return this.http.put(url, hospital)
    // con el map podemos manejar la respuesta

      .map( (resp: any) => {
        
        swal("Hospital actualizado", hospital.nombre, "success");

      return resp.hospital;;

     });
    

  }

  cambiarImagen(file: File, id: string) {
    this._subirArchivoService.subirArchivo(file, 'medicos', id)
      .then( (resp: any) => {
        this.medico.img = resp.img;
        swal('Imagen actualizada', this.medico.nombre, 'success');
         
      })
      .catch( resp => { 
        console.log( resp );
      });

  }

  cargarMedicos( desde: number = 0 ) {

    let url = URL_SERVICIOS + 'medico?desde=' + desde;
    return this.http.get( url );

  }


buscarMedicos( termino: string) {

  let url = URL_SERVICIOS + 'busqueda/coleccion/medicos/' + termino;
    return this.http.get( url ).map( (resp: any) => resp.medicos ); // el map se pone para capturar el resultado y en este caso, 
    // devolver solo la colección de hospitales, sin el total, para que no haya errores
  
}

obtenerMedico( id: string) {
  let url = URL_SERVICIOS + 'medico/' + id;
  return this.http.get( url ).map( (resp: any) => resp.medico);
}

borrarMedico( id: string ) {
  let url = URL_SERVICIOS + 'medico/' + id ;
  url += '?token=' + this._usuarioService.token;
    return this.http.delete( url )
        .map( resp => {
          swal('Medico borrado', 'Medico eliminado correctamente', 'success');
          return true;
        });
}

guardarMedico(medico: Medico){

  if (medico._id) {

    // Actualizar médico

    let url = URL_SERVICIOS + 'medico/' + medico._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put(url, medico )
      .map ( (resp: any) => {   
      
      swal("Medico actualizado", resp.medico.nombre, "success");
  
    return resp.medico;
  
   });

  }
  else {

    // Nuevo médico

    let url = URL_SERVICIOS + 'medico';
    url += '?token=' + this._usuarioService.token;
    return this.http.post(url, medico )
      .map ( (resp: any) => {   
      
      swal("Medico creado", resp.medico.nombre, "success");
  
    return resp.medico;
  
   });
  }



}

}
