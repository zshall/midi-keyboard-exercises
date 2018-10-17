import { MidiService } from "../resources/web-midi/midi-service";
import { autoinject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";

@autoinject
export class Sandbox {
  selectedInputId: string;
  selectedOutputId: string;
  messages: WebMidi.MIDIMessageEvent[];
  private subscription;

  /**
   * Constructs the sandbox
   */
  constructor(private midiService: MidiService, private ea: EventAggregator) {
    this.subscription = this.ea.subscribe('noteOn', response => console.log(response));
    this.subscription = this.ea.subscribe('noteOff', response => console.log(response));
  }

  connect() {
    this.midiService.captureInput(this.selectedInputId);
  }

  message = 'Hello sandbox';
}
