import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'buscaminas';
  filas = 9
  columnas = 9
  items:number[] = [0,1,2,3,4,5,6,7,8]
  buttonsDisabled:boolean[][]=[]
  matrizConMinas:boolean[][]=[]
  matrizContador: number[][] = [];

  
  numMinas:number = 15;

  constructor(){
    this.genTablero()
    this.genMinas()
    this.contarMinas()

  }
  genTablero():void{
    this.buttonsDisabled = [];
    this.matrizConMinas = [];
    for (let i = 0; i < this.filas; i++) {
      this.buttonsDisabled[i]=[]
      this.matrizConMinas[i]=[]
      for (let j = 0; j < this.columnas; j++) {
        this.buttonsDisabled[i][j] = false;
        this.matrizConMinas[i][j] = false;

      }
      
      
      
    }
  }
  genMinas():void{
    let contador = 0;
    let columnaMina:number = 0;
    let filaMina:number = 0;
    while (contador < this.numMinas) {
      columnaMina = Math.floor(Math.random()*(8 - 0))
      filaMina = Math.floor(Math.random()*(9 - 0))
      if (!this.matrizConMinas[filaMina][columnaMina]) {
        this.matrizConMinas[filaMina][columnaMina] = true;
        contador++;
        console.log('Mina colocada en:', filaMina, columnaMina); 
      }
      console.log(filaMina,columnaMina);
      
      
    }

    
  }
  verificarMina(i:number,j:number):void{
    if(this.matrizConMinas[i][j]===true){
      console.log("perdiste");
      for (let i = 0; i < this.filas; i++) {
        for (let j = 0; j < this.columnas; j++) {
          this.buttonsDisabled[i][j] = true;
        }
      }
      
    }
    

  }
  contarMinas():void {
    this.matrizContador = [];
  
    for (let i = 0; i < this.filas; i++) {
      this.matrizContador[i] = [];
      for (let j = 0; j < this.columnas; j++) {
        let contador = 0;
  
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const ni = i + dx;
            const nj = j + dy;
            if (
              ni >= 0 && ni < this.filas &&
              nj >= 0 && nj < this.columnas &&
              !(dx === 0 && dy === 0) &&
              this.matrizConMinas[ni][nj]
            ) {
              contador++;
            }
          }
        }
  
        this.matrizContador[i][j] = contador;
      }
    }
  }
  clickbutton(i:number,j:number){
    this.buttonsDisabled[i][j]=true;
    this.verificarMina(i,j)
  }
  reiniciarJuego(): void {
    
    this.genTablero();
    this.genMinas();
    this.contarMinas();
  }
  


}
