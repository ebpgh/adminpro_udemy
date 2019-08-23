import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import  'rxjs/add/operator/map'; // se podría haber hecho un import de 'rxjs/Rx' pero esto se considera
// mala práctiva porque es una librería muy grande, por eso para importar el map se hace un import
// de 'rxjs/add/operator/map'
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario = null;
  token: string = '';

  constructor(
    public http: HttpClient,  // Necesario para las peticiones hhtp a los servicios
    public router:Router
  ) { 

    console.log('Servicio de Usuario listo.');

  }

  estalogueado() {
    return (this.token.length > 5) ? true : false;
  }

  guardarStorage( id:string, token: string, usuario:Usuario) {
              
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;



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

             });
  }

  logout() {
    this.token = '';
    this.usuario = null;
    
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
    
  }

  logingoogle( token ) {

    let url = URL_SERVICIOS + 'login/google'; 

    return this.http.post(url, { token: token }) 
    //el parámetro token ha de ser un objeto, por eso se ponne de la forma {token:token} 
    //aunque esto es redundante, se podría poner {token} solo
      .map( (resp: any) => {

        this.guardarStorage( resp.id, resp.token, resp.usuario);
        return true;
      });
    
    ;

  }


  loginUsuario( usuario: Usuario, recuerdame: boolean) {
      
    let url = URL_SERVICIOS + 'login'; 

      console.log('URL ', url)

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

              this.guardarStorage( resp.id, resp.token, resp.usuario);

              return true;

             });
  }

}
