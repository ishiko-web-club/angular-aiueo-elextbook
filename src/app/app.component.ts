import { Component, VERSION } from '@angular/core';
import { MathFormulaService } from './math-formula.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
})
export class AppComponent  {
  constructor(private mathFormula: MathFormulaService) {}
  run() {
    const res = this.mathFormula.ohm({V: 1881, R: 20, I: false}, true);
    console.log(res);
  }
}
