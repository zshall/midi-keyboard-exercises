import { MidiService } from "../resources/web-midi/midi-service";
import { autoinject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { SettingService } from "resources/settings/setting-service";

@autoinject
export class Sandbox {
  selectedInputId: string;
  selectedOutputId: string;
  messages: WebMidi.MIDIMessageEvent[];
  private subscription;

  /**
   * Constructs the sandbox
   */
  constructor(private midiService: MidiService, private ea: EventAggregator, private settingService: SettingService) {
    
  }

  attached() {
    this.subscription = this.ea.subscribe('noteOn', response => console.log(response));
    this.subscription = this.ea.subscribe('noteOff', response => console.log(response));
    if (this.settingService.preferredMidiInput) {
      this.selectedInputId = this.settingService.preferredMidiInput;
    }
  }

  connect() {
    if (this.midiService.isConnected(this.selectedInputId)) {
      this.midiService.releaseInput(this.selectedInputId);
    } else {
      this.midiService.captureInput(this.selectedInputId);
      this.settingService.midiAutoconnect = true;
    }
  }

  message = 'Hello sandbox';
}
