import { Note, Scale } from 'tonal';
import { MidiService } from './../resources/app/web-midi/midi-service';
import { MidiMessage } from './../resources/app/web-midi/midi-message';
import { MidiEvents } from './../resources/app/web-midi/midi-constants';
import { SettingService } from './../resources/app/settings/setting-service';
import { autoinject } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

@autoinject
export class Settings {
  midiSubscription: Subscription;
  rangeDefinitionStep: DefineRange = DefineRange.OFF;
  keys: string[] = [];
  scales: string[] = [];

  /**
   * Contstructor with access to SettingService
   */
  constructor(private settingService: SettingService,
              private ea: EventAggregator,
              private midiService: MidiService) {
  }

  /**
   * Define a range the MIDI keyboard plays
   */
  defineMidiRange() {
    this.rangeDefinitionStep = DefineRange.LOWEST;
  }

  attached() {
    this.midiSubscription = this.ea.subscribe(MidiEvents.NOTE_ON, (note: MidiMessage) => {
      switch(this.rangeDefinitionStep) {
        case DefineRange.LOWEST:
          this.settingService.startingNote = note.note;
          this.rangeDefinitionStep = DefineRange.HIGHEST;
          break;
        case DefineRange.HIGHEST:
          this.settingService.endingNote = note.note;
          this.rangeDefinitionStep = DefineRange.OFF;
          break;
      }
    });

    this.keys = Note.names(' #');
    this.scales = Scale.names();
  }

  detached() {
    this.midiSubscription.dispose();
  }

  connect() {
    this.midiService.togglePreferredInputConnect();
  }
}

enum DefineRange {
  OFF,
  LOWEST,
  HIGHEST
}
