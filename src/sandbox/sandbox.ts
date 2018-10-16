import { MidiService } from "../resources/web-midi/midi-service";
import { autoinject } from "aurelia-framework";

@autoinject
export class Sandbox {
  selectedInputId: string;
  selectedOutputId: string;

  /**
   * Constructs the sandbox
   */
  constructor(private midiService: MidiService) {
    
  }

  connect() {
    this.midiService.captureInput(this.selectedInputId);
  }

  message = 'Hello sandbox';
}
