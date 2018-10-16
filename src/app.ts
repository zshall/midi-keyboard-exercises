import {RouterConfiguration, Router} from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class App {
  constructor(private router: Router) {
  }
  
  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Title';
    config.map([
      { route: '', moduleId: PLATFORM.moduleName('sandbox/sandbox'), title:'Sandbox' }
    ]);
  }
}
