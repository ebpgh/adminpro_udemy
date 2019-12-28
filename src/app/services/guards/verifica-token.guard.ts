import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';
import { reject } from 'q';

@Injectable()

export class VerificaTokenGuard implements CanActivate {
  
  constructor(
    public _usuarioService: UsuarioService,
    public route: Router
  ) {

  }

  canActivate(): Promise<boolean> | boolean {

    console.log('verificatokenguard');

    let token = this._usuarioService.token;

    // a continuación decodificamos el token (que está en base64) y obtenemos un objeto JSON con
    // ka fecha de expiración en milisegundos (payload.exp):
    let payload = JSON.parse( atob( token.split('.')[1]));
    console.log(payload);


    let expirado = this.expirado( payload.exp );
 

    // si el token ha expirado se devuelve falso y se va al login
    if ( expirado ) {
      this.route.navigate(['/login']);
      return false;
    }
  


   return this.verificaRenueva(payload.exp);
   
  }


  verificaRenueva( fechaExp: number ): Promise<boolean>  {

        // esta función es una promesa para suscribirnos a ella

    return new Promise( (resolve, reject) => {

      let tokenExp = new Date( fechaExp * 1000 );
      let ahora = new Date();

            // Se añade a la fecha actual 1 hora en milisegundos para dar ese márgen a la hora de 
      // comparar y decidir si se renueva el token (porque falte menos de una hora para que expire)
      ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000 ) );

      // console.log( tokenExp );
      // console.log( ahora );


            // si la fecha de caducidad del token es mayor que la fecha de ahora más el márgen
      // quiere decir que no es necesario renovar el token aún 
      if ( tokenExp.getTime() > ahora.getTime() ) {
        resolve(true);
      } else {

        console.log('No');
        // la fecha de caducidad del token es menor o igual que la fecha de ahora más el márgen 
        // hay que renovar el token
        this._usuarioService.renuevaToken()
              .subscribe( () => {
                resolve(true);
              }, () => {
                            // si el token no se renueva por un error, se redirecciona al login
                this.route.navigate(['/login']);
                reject(false);
              });

      }

    });

  }


  


  expirado( fechaExp: number) {

    let ahora = new Date().getTime() / 1000 // La hora de ahora en milisegundos ya qye getTime da la hora en núm de segundos
    if ( fechaExp < ahora ) return true;
    return false;

  }

}
