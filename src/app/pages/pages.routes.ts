import { Routes, Router, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, AdminGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';



const pagesRoutes: Routes = [ 
    {
    path: '', component: PagesComponent,
    canActivate: [ LoginGuardGuard],
    children: [
        { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' }},
        { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' }},
        { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' }},
        { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
        { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},
        { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes' }},

        // Mantenimientos
        { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' }},
        
        { path: 'usuarios', canActivate: [ AdminGuard], component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios' }},

        { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de médicos' }},
        { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar médico' }},
        { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales' }},

        { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' }},
        { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
