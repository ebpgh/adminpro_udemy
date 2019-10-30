// fichero generado con ng g g services/guards/loginGuard --spec=false

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()

export class LoginGuardGuard implements CanActivate {


  constructor(
    public _usuarioService: UsuarioService,
    public router:Router
  ) {}

  canActivate()
  {  
    if (this._usuarioService.estalogueado())
    {

      return true;
    }
    console.log('bloqueado por el guard')
    this.router.navigate(['/login']);
    return false;
  }
  
}
