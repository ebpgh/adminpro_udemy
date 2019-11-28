import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
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
export class HospitalService {

  usuario: Usuario = null;

  constructor(
    public http: HttpClient,  // Necesario para las peticiones hhtp a los servicios
    public router:Router,
    public _usuarioService: UsuarioService,
    public _subirArchivoService: SubirArchivoService
  ) { 

    console.log('Servicio de Hospital listo.');

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
    this._subirArchivoService.subirArchivo(file, 'usuarios', id)
      .then( (resp: any) => {
        this.usuario.img = resp.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');
         
      })
      .catch( resp => { 
        console.log( resp );
      });

  }

  cargarHospitales( desde: number = 0 ) {

    let url = URL_SERVICIOS + 'hospital?desde=' + desde;
    return this.http.get( url );

  }


buscarHospitales( termino: string) {

  let url = URL_SERVICIOS + 'busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url ).map( (resp: any) => resp.hospitales ); // el map se pone para capturar el resultado y en este caso, 
    // devolver solo la colección de hospitales, sin el total, para que no haya errores
  
}

obtenerHospital( id: string) {
  let url = URL_SERVICIOS + 'hospital/' + id;
  return this.http.get( url ).map( (resp: any) => resp.hospital);
}

borrarHospital( id: string ) {
  let url = URL_SERVICIOS + 'hospital/' + id ;
  url += '?token=' + this._usuarioService.token;
    return this.http.delete( url )
        .map( resp => {
          swal('Hospital borrado', 'Hospital eliminado correctamente', 'success');
          return true;
        });
}

crearHospital(nombre: string){
  let url = URL_SERVICIOS + 'hospital';
  url += '?token=' + this._usuarioService.token;
  return this.http.post(url, { nombre })
    .map ( (resp: any) => {   
    
    swal("Hospital creado", resp.hospital.nombre, "success");

  return resp.hospital;

 });

}

}
