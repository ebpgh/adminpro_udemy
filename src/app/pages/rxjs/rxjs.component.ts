import { Component, OnInit, OnDestroy } from '@angular/core';
//import { Observable, Subscriber, Subscription } from 'rxjs';
import { Observable  } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subscriber } from 'rxjs/Subscriber';


import { retry } from 'rxjs/internal/operators/retry';
import { map } from 'rxjs/internal/operators/map';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  suscripcion: Subscription;

  constructor() {

      this.regresaObservable().pipe(
        retry(2)
      );

      this.suscripcion = this.regresaObservable().subscribe(
        numero => console.log( 'Subs', numero),
        error => console.error('Error ', error) ,
        () => console.log('El observador finalizó ')
      );

  }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {

    this.suscripcion.unsubscribe();
  }

  regresaObservable(): Observable<any> {
      return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        const salida = {
          valor: contador
        };

        observer.next( salida );

        // if ( contador === 4) {
        //   clearInterval( intervalo );
        //   observer.complete();

        // }

        // if ( contador === 3) {
        //   // clearInterval( intervalo );
        //   observer.error('Adiós');

        // }

      }, 1000);

    }).pipe(
      map ( resp => resp.valor),
      filter ( (valor, index) => {
        console.log('Filter', valor, index);
        if ( valor % 2 === 1) {
          // impar
          return true;
        } else {
          return false;
        }
      })
      );

  }

}
