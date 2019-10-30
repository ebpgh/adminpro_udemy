import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
// import swal from 'sweetalert';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {


usuarios: Usuario[] = [];
desde: number = 0;
totalRegistros: number = 0;
cargando: boolean;

  constructor(
    public _usuarioService: UsuarioService,
    public __modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    // A continuación, no suscribimos a la notificación de la actualización de imágenes para que cada vez que 
    // se actualice una imagen, se rercague la lista de usuarios que se muestra en la tabla.
    this.__modalUploadService.notificacion
        .subscribe( resp => this.cargarUsuarios());
  }

  mostrarModal(id: string) {
    this.__modalUploadService.mostrarModal( 'usuarios', id);
  }

  cargarUsuarios() {

    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde )
      .subscribe( (resp: any) => {
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
        console.log(resp);
      });  
  }

  cambiarDesde( valor: number) {

    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) return;
    if (desde < 0) return;

    this.desde += valor;
    this.cargarUsuarios();

  }

buscarUsuarios( termino: string) {

  if (termino.length <=0) {
    this.cargarUsuarios();
    return;
  }

this.cargando=true;

  this._usuarioService.buscarUsuarios( termino )
    .subscribe( (usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.cargando=false;

    });  
}

borrarUsuario( usuario: Usuario ) {

  if(usuario._id == this._usuarioService.usuario._id) {
    swal('Imposible borrar usuario', 'No se puede borrar a si mismo', 'error')
    return;
  }

  swal({
    title: '¿Está seguro?',
    text: 'Una vez eliminado el usuario ' + usuario.nombre + ' no se podrá recuperar',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  })
  .then( borrar => {

    console.log(borrar)

    if (borrar) {
          this._usuarioService.borrarUsuario(usuario)
            .subscribe( resp => {
              console.log(resp);
              this.cargarUsuarios();
            })
      };

  });

}

guardarUsuario( usuario: Usuario ) {
  this._usuarioService.actualizarUsuario(usuario)
    .subscribe( resp => {
      console.log(resp);
      this.cargarUsuarios();
    })
}

}
