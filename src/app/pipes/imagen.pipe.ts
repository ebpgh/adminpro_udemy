import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + 'imagenes';

    // si no se envía imagen que devuelva la imagen por defecto 
    // en los servicios, si la url de imagen no es válida, devuelve una imagen por defecto
    // por eso se pone una url 'tonta'
    if (!img) 
    {
      url+= '/usuarios/tonteria'; 
      console.log(url);
      return url; 
    }

    
    // si en la string img recibida se encuentra 'https' quiere decir que la imagen es de un usuario
    // con cuenta google y por tanto img tiene la url de dicha imagen, por eso se hace el
    // return img directamente sin más
    if (img.indexOf('https') >=0 ) return img;
    
    switch (tipo) {
      case 'usuario':
        url+= '/usuarios/' + img;
        break;
      case 'medico':
        url+= '/medicos/' + img;
        break;
      case 'hospital':
        url+= '/hospitales/' + img;
        break;
      default:
        console.log('El tipo de imagen es erróneo, tiene que se usuarios, hospitales o medicos');
        url+= '/usuarios/tonteria';
        break;
    }


    return url;
  }

}
