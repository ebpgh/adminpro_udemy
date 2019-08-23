import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor( 
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  passwordDiferentes( campo1: string, campo2: string) {

    return ( group: FormGroup) => {

        let pass1 = group.controls[campo1].value;
        let pass2 = group.controls[campo2].value;

        if (pass1 === pass2) return null;

        return {
          passwordDiferentes: true
        }

    }

  }


  ngOnInit() {
    init_plugins();   
    
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.passwordDiferentes('password', 'password2') });

    this.forma.setValue({
      nombre: 'Nuevo usuario',
      correo: 'correo@dominio.com',
      password: '1234',
      password2: '1234',
      condiciones: true
    });

  }

  registrarUsuario() {

    console.log('Formulario válido ',this.forma.valid);
    console.log(this.forma.value);

    if (!this.forma.value.condiciones) {
      console.log('Debe aceptar las condiciones.');
      swal("Atención", "Debe aceptar las condiciones.", "warning"); //swal pertenece al  paquete para mensajes SweetAlert
    }
    
    if (this.forma.invalid) return;

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario( usuario )
      .subscribe ( resp  => { 
          console.log(resp);
          // Para que una vez creado el usuario navegue al login:
          this.router.navigate(['/login']);
      });

      // Puesto que si se produce un error en el método crearUsuario no se disparará
      // el suscribe, lo anterior se podría resumir en una sola línea:
      // this._usuarioService.crearUsuario( usuario ).subscribe ( resp  => this.router.navigate(['/login']));
    
  }

}
