import {Component, HostListener, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {POPOUT_MODAL_DATA, POPOUT_MODALS, PopoutData, PopoutModalName} from './services/popout.tokens';
import {PopoutService} from './services/popout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  customerDetails: any = {};
  companyDetails: any = {};

  constructor(private popoutService: PopoutService) {
    this.customerDetails = {
      'Jessica': {
        id: '1111',
        age: 35,
        employer: 'ABCD Bank'
      },
      'Mark': {
        id: '2222',
        age: 45,
        employer: 'XY Holding'
      },
    };
    this.companyDetails = {
      'ABCD Bank': {
        id: 2020,
        founded: 1982,
        employeeCount: 20000,
        description: 'ABCD Bank provides wide variety of innovative banking products and services. ' +
          'We are located in several regions of California and Florida. '
      },
      'XY Holdings': {
        id: 2021,
        founded: 2000,
        employeeCount: 10000,
        description: 'XY Holdings Ltd. provides hosting services, custom software solutions, and an import/export division.'
      }
    };
  }

  @HostListener('window:beforeunload', ['$event'])
  onWindowClose(event: Event) {
    this.popoutService.closePopoutModal();
  }

  openCustomerPopout(name: string) {
    const modalData = {
      modalName: PopoutModalName.customerDetail,
      name: name,
      id: this.customerDetails[name].id,
      age: this.customerDetails[name].age,
      employer: this.customerDetails[name].employer
    };

    const customerPopoutDetails = POPOUT_MODALS[PopoutModalName.customerDetail];

    if (!this.popoutService.isPopoutWindowOpen(PopoutModalName.customerDetail)) {
      this.popoutService.openPopoutModal(modalData);
    } else {
      const sameCustomer = customerPopoutDetails['componentInstance'].name === name;
      // When popout modal is open and there is no change in data, focus on popout modal
      if (sameCustomer) {
        this.popoutService.focusPopoutWindow(PopoutModalName.customerDetail);
      } else {
        customerPopoutDetails['host'].detach();
        const injector = this.popoutService.createInjector(modalData);
        const componentInstance = this.popoutService.attachCustomerContainer(customerPopoutDetails['host'], injector);
        customerPopoutDetails['componentInstance'] = componentInstance;
        this.popoutService.focusPopoutWindow(PopoutModalName.customerDetail);
      }
    }
  }

  openEmployerPopout(name: string) {
    const modalData = {
      modalName: PopoutModalName.employerDetail,
      name: name,
      id: this.companyDetails[name].id,
      description: this.companyDetails[name].description,
      founded: this.companyDetails[name].founded,
      employeeCount: this.companyDetails[name].employeeCount
    };

    const employerPopoutDetails = POPOUT_MODALS[PopoutModalName.employerDetail];

    if (!this.popoutService.isPopoutWindowOpen(PopoutModalName.employerDetail)) {
      this.popoutService.openPopoutModal(modalData);
    } else {
      const sameCustomer = employerPopoutDetails['componentInstance'].name === name;
      // When popout modal is open and there is no change in data, focus on popout modal
      if (sameCustomer) {
        this.popoutService.focusPopoutWindow(PopoutModalName.employerDetail);
      } else {
        employerPopoutDetails['host'].detach();
        const injector = this.popoutService.createInjector(modalData);
        const componentInstance = this.popoutService.attachEmployerContainer(employerPopoutDetails['host'], injector);
        employerPopoutDetails['componentInstance'] = componentInstance;
        this.popoutService.focusPopoutWindow(PopoutModalName.employerDetail);
      }
    }
  }
}
