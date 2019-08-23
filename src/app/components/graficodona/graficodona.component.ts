import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graficodona',
  templateUrl: './graficodona.component.html'
})
export class GraficodonaComponent implements OnInit {

  @Input() ChartLabels:string[] = [];
  @Input() ChartData:number[] = [];
  @Input() ChartType:string = '';
  @Input() leyenda: string;

  constructor() { }

  ngOnInit() {
  }

}
