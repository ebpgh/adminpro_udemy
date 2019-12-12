import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import  'rxjs/add/operator/map'; // se podría haber hecho un import de 'rxjs/Rx' pero esto se considera
// mala práctiva porque es una librería muy grande, por eso para importar el map se hace un import
// de 'rxjs/add/operator/map'
import  'rxjs/add/operator/catch'; // mismo comentario que en el caso del map
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario = null;
  token: string = '';
  menu: any = [];

  constructor(
    public http: HttpClient,  // Necesario para las peticiones hhtp a los servicios
    public router:Router,
    public _subirArchivoService: SubirArchivoService
  ) { 

    console.log('Servicio de Usuario listo.');

  }

  estalogueado() {
    return (this.token.length > 5) ? true : false;
  }

  guardarStorage( id:string, token: string, usuario:Usuario, menu: any) {
              
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario; 
    this.token = token;
    this.menu = menu;

  }

  crearUsuario( usuario: Usuario) {
      
    let url = URL_SERVICIOS + 'usuario'; 
      console.log('URL ', url)
// este será el observador al que nos podremos suscribir
      return this.http.post(url, usuario) 

            // con el map podemos manejar la respuesta

             .map( (resp: any) => {

              swal('Usuario creado', usuario.email, 'success'); 
              return resp.usuario;

             }).catch( err => {

              // ver en el backend como se generan los objetos con los errores y como se pone el mensaje
              // persomnalizado (mensaje)

               swal( err.error.mensaje, err.error.errors.message, 'error');
               return Observable.throw( err );


            });
  }

  logout() {
    this.token = '';
    this.usuario = null;
    
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
    
  }

  logingoogle( token ) {

    let url = URL_SERVICIOS + 'login/google'; 

    return this.http.post(url, { token: token }) 
    //el parámetro token ha de ser un objeto, por eso se ponne de la forma {token:token} 
    //aunque esto es redundante, se podría poner {token} solo
      .map( (resp: any) => {

        this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      });
    
    ;

  }


  loginUsuario( usuario: Usuario, recuerdame: boolean) {
      
    let url = URL_SERVICIOS + 'login'; 

      if (recuerdame) {
        localStorage.setItem('email', usuario.email);
      }
      else {
        localStorage.setItem('email', '');
      }

      
      // este será el observador al que nos podremos suscribir
      return this.http.post(url, usuario) 

            // con el map podemos manejar la respuesta

             .map( (resp: any) => {

              this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);

              return true;

             })
             .catch( err => {

               // ver en el backend como se generan los objetos con los errores y como se pone el mensaje
               // persomnalizado (mensaje)

                swal( 'Error login', err.error.mensaje, 'error');
                return Observable.throw( err );


             });
  }

  actualizarUsuario( usuario: Usuario) {

    let url = URL_SERVICIOS + 'usuario/' + usuario._id;
    url += '?token=' + this.token;
    
    return this.http.put(url, usuario)
    // con el map podemos manejar la respuesta

      .map( (resp: any) => {

        if (usuario._id === this.usuario._id) {
          /* solo actualizamos el storage de usuario cuando el usuario modificado es el mismo que el conectado */
          this.guardarStorage( resp.usuario._id, this.token, resp.usuario, this.menu);
        }

       
        swal("Usuario actualizado", usuario.nombre, "success");

      return true;

     });
    

  }

  cambiarImagen(file: File, id: string) {
    this._subirArchivoService.subirArchivo(file, 'usuarios', id)
      .then( (resp: any) => {
        this.usuario.img = resp.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario, this.menu);
        
      })
      .catch( resp => { 
        console.log( resp );
      });

  }

  cargarUsuarios( desde: number = 0 ) {

    let url = URL_SERVICIOS + 'usuario?desde=' + desde;
    return this.http.get( url );

  }


buscarUsuarios( termino: string) {

  let url = URL_SERVICIOS + 'busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url ).map( (resp: any) => resp.usuarios ); // el map se pone para capturar el resultado y en este caso, 
    // devolver solo la colección de usuarios, sin el total, para que no haya errores
  
}

borrarUsuario( usuario: Usuario) {
  let url = URL_SERVICIOS + 'usuario/' + usuario._id +'?token=' + this.token;
    return this.http.delete( url )
        .map( resp => {
          swal('Usuario borrado', 'Usuario eliminado correctamente', 'success');
          return true;
        });
}

}
