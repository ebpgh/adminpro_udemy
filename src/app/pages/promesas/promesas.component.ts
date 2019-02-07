import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    
/*     let promesa = new Promise( (resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          resolve('Ok!');
          // reject('Un error pasó');
          clearInterval(intervalo);
        }
      }, 1000);
    }); */


    this.contarTres().then(
      // () => console.log('Terminó')
      mensaje => console.log('Terminó', mensaje)
    )
    .catch( error => console.log('Error en la promesa', error));


  }

  ngOnInit() {

  }

  contarTres(): Promise<boolean> {

/*     let promesa = new Promise( (resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          resolve(true);
          // reject('Un error pasó');
          clearInterval(intervalo);
        }
      }, 1000);
    });

    return promesa; */

    return new Promise( (resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          // resolve(true);
          reject(false);
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

}
