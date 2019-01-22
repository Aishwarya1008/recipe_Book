import {Action} from '@ngrx/store';

export interface PayAction extends Action {
  payload?: any;
}
