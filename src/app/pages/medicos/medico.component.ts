import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MedicoService, HospitalService } from 'src/app/services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];s
  hospital: Hospital;
  medico: Medico = new Medico('', '', '', '', '');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public __modalUploadService: ModalUploadService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { 

    activatedRoute.params.subscribe( params => {
        let id = params['id'];
        this.cargarMedico(id);
    });

  }

  ngOnInit() {
    this._hospitalService.cargarHospitales()
    .subscribe( (resp: any) => {
      this.hospitales = resp.hospitales;
    });  
    this.__modalUploadService.notificacion
    .subscribe( (resp: any) => {
      console.log('image',resp);
      this.medico.img = resp.img;
    });
  }

  guardarMedico( f: NgForm ) {
    
    if(!f.valid) return;
    this._medicoService.guardarMedico(this.medico)
    .subscribe(medico => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico', medico._id ])
    });
    
  }

  cambioHospital( id: string ) {
    this._hospitalService.obtenerHospital(id)
      .subscribe(hospital => {
        this.hospital = hospital;
      });
  }

  cargarMedico(id: string) {
    this._medicoService.obtenerMedico(id)
      .subscribe(medico => {
        console.log(medico);
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital(this.medico.hospital);
      });
  }

  mostrarModal(id: string) {
    this.__modalUploadService.mostrarModal( 'medicos', id);
  }

}
