import { Component } from '@angular/core';
import { OperationsService } from '../operations.service';

@Component({
  selector: 'app-calc-view',
  templateUrl: './calc-view.component.html',
  styleUrls: ['./calc-view.component.scss']
})
export class CalcViewComponent {
  constructor(public operationsService: OperationsService) { }
}
