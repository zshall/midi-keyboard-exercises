import { MidiService } from "../resources/app/web-midi/midi-service";
import { autoinject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { SettingService } from "resources/app/settings/setting-service";

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

  detached() {
    this.subscription.dispose();
  }

  connect() {
    this.midiService.togglePreferredInputConnect();
  }

  message = 'Hello sandbox';
}
