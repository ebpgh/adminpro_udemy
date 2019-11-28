import { Component, OnInit } from '@angular/core';
import { UsuarioService, MedicoService } from 'src/app/services/service.index';
import { HospitalService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/medico.model';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean;

  constructor(
    public _medicoService: MedicoService,
  ) { }

   
      ngOnInit() {
        this.cargarMedicos();
      }
    
   
      cargarMedicos() {
    
        this.cargando = true;
        this._medicoService.cargarMedicos( this.desde )
          .subscribe( (resp: any) => {
            this.totalRegistros = resp.total;
            this.medicos = resp.medicos;
            this.cargando = false;
          });  
      }
    
      cambiarDesde( valor: number) {
    
        let desde = this.desde + valor;
    
        if (desde >= this.totalRegistros) return;
        if (desde < 0) return;
    
        this.desde += valor;
        this.cargarMedicos();
    
      }
    
    buscarMedicos( termino: string) {
    
      if (termino.length <=0) {
        this.cargarMedicos();
        return;
      }
    
    this.cargando=true;
    
      this._medicoService.buscarMedicos( termino )
        .subscribe( (medicos: Medico[]) => {
          this.medicos = medicos;
          this.cargando=false;
    
        });  
    }
    
    borrarMedico( medico: Medico ) {
    
      swal({
        title: '¿Está seguro?',
        text: 'Una vez eliminado el médico ' + medico.nombre + ' no se podrá recuperar',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
      .then( borrar => {
      
        if (borrar) {
              this._medicoService.borrarMedico(medico._id)
                .subscribe( resp => {
                  this.cargarMedicos();
                })
          };
    
      });
    
    }

 
  }

