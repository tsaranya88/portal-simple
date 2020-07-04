import { Component, Inject, Input, OnInit, Output } from '@angular/core';

import {POPOUT_MODAL_DATA, PopoutData} from '../services/popout.tokens';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
})
export class CustomerComponent {
  id: number;
  age: number;
  name: string;
  employer: string;

  constructor(
    @Inject(POPOUT_MODAL_DATA) public data: PopoutData
  ) {
    this.id = this.data.id;
    this.age = this.data.age;
    this.name = this.data.name;
    this.employer = this.data.employer;
  }
}
