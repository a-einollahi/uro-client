import { NgModule } from '@angular/core';
import { JalaliPipe } from './../pipes/jalali.pipe';
import { FarsiPipe } from '../pipes/farsi.pipe';

const pipes = [ JalaliPipe, FarsiPipe ]

@NgModule({
  declarations: [...pipes],
  exports: [...pipes]
})
export class PipesModule { }
