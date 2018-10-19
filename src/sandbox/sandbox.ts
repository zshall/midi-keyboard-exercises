import { TheoryService } from './../resources/app/music-theory/theory-service';
import { MidiService } from "../resources/app/web-midi/midi-service";
import { autoinject } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { SettingService } from "resources/app/settings/setting-service";

@autoinject
export class Sandbox {
  selectedInputId: string;
  selectedOutputId: string;
  messages: WebMidi.MIDIMessageEvent[];
  chords: string[] = [];
  private subscription;

  /**
   * Constructs the sandbox
   */
  constructor(private midiService: MidiService,
              private ea: EventAggregator,
              private settingService: SettingService,
              private theoryService: TheoryService) {
    
  }

  attached() {
    this.subscription = this.ea.subscribe('noteOn', response => {
      console.log(response);
      this.chords = this.theoryService.GetChordsForMidiNotes(this.midiService.currentNotesPlaying);
    });
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
