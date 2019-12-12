import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { SettingsService, SidebarService, SharedService, LoginGuardGuard, AdminGuard} from './service.index';
import { UsuarioService } from './usuario/usuario.service';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HospitalService } from './hospital/hospital.service';
import { MedicoService } from './medico/medico.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, HttpClientModule
  ],
  providers: [SettingsService, SidebarService, SharedService, UsuarioService, LoginGuardGuard, AdminGuard,
    SubirArchivoService, ModalUploadService, HospitalService, MedicoService]
})
export class ServiceModule { }
