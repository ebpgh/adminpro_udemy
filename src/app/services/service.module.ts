import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { SettingsService, SidebarService, SharedService, LoginGuardGuard} from './service.index';
import { UsuarioService } from './usuario/usuario.service';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, HttpClientModule
  ],
  providers: [SettingsService, SidebarService, SharedService, UsuarioService, LoginGuardGuard, SubirArchivoService]
})
export class ServiceModule { }
