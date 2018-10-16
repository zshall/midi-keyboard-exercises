import { MidiService } from "../resources/web-midi/midi-service";
import { autoinject } from "aurelia-framework";

@autoinject
export class Sandbox {
  /**
   * Constructs the sandbox
   */
  constructor(private midiService: MidiService) {
    
  }

  message = 'Hello sandbox';
}
