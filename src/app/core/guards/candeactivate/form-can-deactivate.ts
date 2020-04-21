import { ComponentCanDeactivate } from './component-can-deactivate';
import { FormGroup } from '@angular/forms';

export abstract class FormCanDeactivate extends ComponentCanDeactivate{

  myform: FormGroup;

 canDeactivate(): boolean{
    console.log(this.myform);
    return this.myform.pristine; // pristine by default gives true if you made any change it become false
  }
}
