import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import swal from 'sweetalert';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  email: string;
  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
   }

  ngOnInit() {

  }

  // Este método guardar realmanete recibe los valores de un formulario (f.value) pero se coorresponden con un nombre de usuario
  // y un email que son parte de un objeto de tipo Usuario, los demás campos estarán vacíos (undefined)
  guardar (usuario: Usuario) {

    this.usuario.nombre = usuario.nombre;

    if (!this.usuario.google) { 
      this.usuario.email = usuario.email 
    } 

    this._usuarioService.actualizarUsuario( this.usuario ).subscribe();


  }

  seleccionImagen( fichero ) {

    if (!fichero) {
      this.imagenSubir = null; 
      return;
    }
    // comprobación de que el fichero es una imagen (por el tipo)
    if (fichero.type.indexOf('image') < 0) {
      swal('Fichero no válido', 'El fichero seleccionado no es una imagen','error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir  = fichero;
    let reader = new FileReader();
    reader.readAsDataURL( fichero );

    reader.onloadend = () => this.imagenTemp = reader.result.toString();
    

  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
