import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';

import { FormsModule } from '@angular/forms';


// ng2-charts

import { ChartsModule } from 'ng2-charts';

// import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficodonaComponent } from '../components/graficodona/graficodona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

//pipe module
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
// import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { MedicosComponent } from './medicos/medicos.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


@NgModule({
    declarations: [
        //PagesComponent, El PagesComponent se quita de aquí porque ya se carga en el app.routes
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficodonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        // ModalUploadComponent,
        MedicosComponent,
        HospitalesComponent,
        MedicoComponent,
        BusquedaComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule
    ]

})

export class PagesModule {}
