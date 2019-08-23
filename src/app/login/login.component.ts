import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

declare const gapi:any; // para integración con la api de google

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  [x: string]: any;

  recuerdame: boolean = false;
  email: string;
  auth2: any; // para integración con la api de google


  constructor( public router: Router, public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 2) this.recuerdame = true;
  }

  googleInit() {

    /* ver https://developers.google.com/identity/sign-in/web/listeners */
    //Inicialización de los servicios de google con el id del cliente

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '522828037753-7h4o4ialbhvn85sg98bi7c2rtad833f2.apps.googleusercontent.com',
        coockiepolicy: 'single_host_origin',
        scope: 'profile email'
    });

    // Conectar el boton de validación con google con el servicio correspondiente
    // se activará el listener
    this.attachSignin(document.getElementById('btnGoogle'));

    
    });
  }

  attachSignin( element ) {
    
    // de la documentación de google - googleUser es lo que se recibe
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
        let profile = googleUser.getBasicProfile(); // esto lo hemos dejado como curiosidad
        let token = googleUser.getAuthResponse().id_token;

/*         console.log(profile);
        console.log(token); */

        this._usuarioService.logingoogle( token )
        .subscribe( resp => window.location.href = '#/dashboard');
        // la forma siguiente hace que la pantalla de dashboard se vea cortada
        // por eso ponemos window.location
          //.subscribe( resp => this.router.navigate(['/dashboard']));

    });
  }

  entrar(forma: NgForm) {

    if (forma.invalid) return;

    console.log(forma.value);

    let usuario = new Usuario( null, forma.value.email, forma.value.password);

    this._usuarioService.loginUsuario(usuario, forma.value.recuerdame)
/*           .subscribe( resp => {
            console.log('Respuesta entrar ',resp);
            this.router.navigate(['/dashboard']);
          }); */

          .subscribe( resp => this.router.navigate(['/dashboard']));
          

    
  }
}
