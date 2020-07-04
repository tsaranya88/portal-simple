import { Component, Inject, Input, OnInit, Output } from '@angular/core';

import {POPOUT_MODAL_DATA, PopoutData} from '../services/popout.tokens';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html',
})
export class EmployerComponent {
  id: number;
  name: string;
  founded: string;
  employeeCount: string;
  description: string;

  constructor(
    @Inject(POPOUT_MODAL_DATA) public data: PopoutData
  ) {
    this.id = this.data.id;
    this.name = this.data.name;
    this.founded = this.data.founded;
    this.description = this.data.description;
    this.employeeCount = this.data.employeeCount;
  }
}
