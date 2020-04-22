import { ComponentCanDeactivate } from './component-can-deactivate';
import { FormGroup } from '@angular/forms';

export abstract class FormCanDeactivate extends ComponentCanDeactivate{

  formCanDeactivate: FormGroup;

 canDeactivate(): boolean{
    return this.formCanDeactivate.pristine; // pristine by default gives true if you made any change it become false
  }
}
