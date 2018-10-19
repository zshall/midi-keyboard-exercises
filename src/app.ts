import {RouterConfiguration, Router} from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { autoinject } from "aurelia-framework";
import { MidiService } from 'resources/app/web-midi/midi-service';

@autoinject
export class App {
  constructor(private router: Router, private midiService: MidiService) {
  }
  
  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Title';
    config.map([
      { route: '', moduleId: PLATFORM.moduleName('sandbox/sandbox'), title:'Sandbox' },
      { route: 'home', moduleId: PLATFORM.moduleName('sandbox/sandbox'), title:'Sandbox', name: 'home' },
      { route: 'options', moduleId: PLATFORM.moduleName('settings/settings'), title: 'Options', name: 'options' }
    ]);
  }
}
