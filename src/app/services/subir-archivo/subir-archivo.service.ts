import { Injectable } from '@angular/core';
import { XhrFactory } from '@angular/common/http';
import { reject } from 'q';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  // subirArchivo es el métodp que usaremos para subir imágenes. Estará en javascript puro ya que typescript no dispone de 
  // una función específica para esto-
subirArchivo( archivo: File, tipo: string, id: string){

  // El proceso de subida se mete dentro de una promesa para después poder suscribirse a ella y recibir el aviso de qyue el 
  // proceso ha finalizado
  return new Promise( (resolve, reject) => {

    let formData = new FormData();
    let xhr = new XMLHttpRequest(); //vía ajax
  
    formData.append( 'imagen', archivo, archivo.name);
  
    xhr.onreadystatechange = function() {
  
      if ( xhr.readyState === 4) {
        // El proceso de subida terminó, si readystate <> 4 el proceso de subida no ha terminado, funciona esto como una promesa
        if ( xhr.status === 200 ) {
          console.log('Imagen subida');
          // xhr.response recoge la respuesta (mensaje) que proporiona el servicio (backend localhost:3000/upload/....)cuando termina
          resolve( JSON.parse( xhr.response));
        }
        else {
          console.log('Subida de imagen fallo');
          reject( xhr.response);
        } 
      }
    };

      let url = URL_SERVICIOS + 'upload/' + tipo + '/' + id;
      xhr.open('PUT', url, true) // true significa que el proceso será asíncrono
      xhr.send( formData);


  });



}

}
