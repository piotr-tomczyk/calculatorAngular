import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalcViewComponent } from './calc-view/calc-view.component';
const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
