import { ComponentPortal, DomPortalOutlet, PortalInjector } from '@angular/cdk/portal';
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, OnDestroy } from '@angular/core';
import {POPOUT_MODAL_DATA, POPOUT_MODALS, PopoutData, PopoutModalName} from './popout.tokens';
import {CustomerComponent} from '../customer/customer.component';
import {EmployerComponent} from '../employer/employer.component';

@Injectable()
export class PopoutService implements OnDestroy {
  constructor(
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef
  ) {
  }

  ngOnDestroy() {}

  openPopoutModal(data) {
    const windowInstance = this.openOnce(
      'assets/modal/popout.html',
      `${data.modalName}`
    );

    // Wait for window instance to be created
    setTimeout(() => {
      this.createCDKPortal(data, windowInstance);
    }, 1000);
  }

  openOnce(url, target) {
    // open a blank "target" window
    // or get the reference to the existing "target" window
    const winRef = window.open('', target, '', true);
    // if the "target" window was just opened, change its url
    if (winRef.location.href === 'about:blank') {
      winRef.location.href = url;
    }
    return winRef;
  }

  createCDKPortal(data, windowInstance) {
    if (windowInstance) {
      windowInstance.document.body.innerText = '';
      // create a PortalOutlet with the body of the new window document
      const outlet = new DomPortalOutlet(windowInstance.document.body, this.componentFactoryResolver, this.applicationRef, this.injector);
      // Copy styles from parent window
      document.querySelectorAll('link, style').forEach(htmlElement => {
        windowInstance.document.head.appendChild(htmlElement.cloneNode(true));
      });
      // Create an injector with modal data
      const injector = this.createInjector(data);

      // Attach the portal
      let componentInstance;
      if (data.modalName === PopoutModalName.customerDetail) {
        windowInstance.document.title = 'Customer Modal';
        componentInstance = this.attachCustomerContainer(outlet, injector);
      }
      if (data.modalName === PopoutModalName.employerDetail) {
        windowInstance.document.title = 'Employer Modal';
        componentInstance = this.attachEmployerContainer(outlet, injector);
      }

      POPOUT_MODALS[data.modalName] = { windowInstance, outlet, componentInstance };
    }
  }

  isPopoutWindowOpen(modalName) {
    return POPOUT_MODALS[modalName]['windowInstance'] && !POPOUT_MODALS[modalName]['windowInstance'].closed;
  }

  focusPopoutWindow(modalName) {
    POPOUT_MODALS[modalName]['windowInstance'].focus();
  }

  closePopoutModal() {
    Object.keys(POPOUT_MODALS).forEach(modalName => {
      if (POPOUT_MODALS[modalName]['windowInstance']) {
        POPOUT_MODALS[modalName]['windowInstance'].close();
      }
      POPOUT_MODALS[modalName] = {};
    });
  }

  attachCustomerContainer(outlet, injector) {
    const containerPortal = new ComponentPortal(CustomerComponent, null, injector);
    const containerRef: ComponentRef<CustomerComponent> = outlet.attach(containerPortal);
    return containerRef.instance;
  }

  attachEmployerContainer(outlet, injector) {
    const containerPortal = new ComponentPortal(EmployerComponent, null, injector);
    const containerRef: ComponentRef<EmployerComponent> = outlet.attach(containerPortal);
    return containerRef.instance;
  }

  createInjector(data): PortalInjector {
    const injectionTokens = new WeakMap();
    injectionTokens.set(POPOUT_MODAL_DATA, data);
    return new PortalInjector(this.injector, injectionTokens);
  }
}
