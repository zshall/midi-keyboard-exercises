import { MidiMessage } from './midi-message';
import { MessageDecodingService } from './message-decoding-service';
import { EventAggregator } from "aurelia-event-aggregator";
import { autoinject } from "aurelia-framework";
import { Status } from './midi-constants';

@autoinject
export class MidiService {
  isActive: boolean;
  isUnsupported: boolean;

  currentNotesPlaying: MidiMessage[] = [];

  /**
   * Constructs the MIDI service
   */
  constructor(private midiAccess: WebMidi.MIDIAccess, private eventAggregator: EventAggregator, private messageDecodingService: MessageDecodingService) {
    this.activate();
  }

  async activate() {
    if (navigator.requestMIDIAccess) {
      console.log('Rarin to rip.');

      this.midiAccess = await navigator.requestMIDIAccess();

      console.log('MIDI ready!');
      for (var input of this.midiAccess.inputs.keys()) {
        console.log(input);
      }

      this.isActive = true;
    } else {
      console.error('This browser does not support web MIDI :(');

      this.isUnsupported = true;
    }
  }

  private getNames(enumerator: Map<string, WebMidi.MIDIPort>) {
    const names = [];
    for (var key of enumerator.keys()) {
      names.push({
        key,
        value: enumerator.get(key).name
      });
    }
    return names;
  }

  inputNames() {
    return this.getNames(this.midiAccess.inputs);
  }

  outputNames() {
    return this.getNames(this.midiAccess.outputs);
  }
  
  captureInput(key: string) {
    const input = this.midiAccess.inputs.get(key);
    if (input) {
      input.onmidimessage = midiMessage => {
        //this.eventAggregator.publish('midiEvent', midiMessage);
        const decoded = this.messageDecodingService.decodeMessage(midiMessage);
        switch(decoded.status) {
          case Status.NOTE_OFF:
            this.removeCurrentNote(decoded);
            this.eventAggregator.publish('noteOff', decoded);
            break;
          case Status.NOTE_ON:
            this.currentNotesPlaying.push(decoded);
            this.eventAggregator.publish('noteOn', decoded);
            break;
        }
      }
    }
  }

  releaseInput(key: string) {
    const input = this.midiAccess.inputs.get(key);
    if (input) {
      input.onmidimessage = null;
    }
  }

  removeCurrentNote(decoded: MidiMessage) {
    for (let i = 0; i < this.currentNotesPlaying.length; i++) {
      const val = this.currentNotesPlaying[i];
      if (val.channel === decoded.channel && val.octave == decoded.octave
        && val.note === decoded.note && val.id == decoded.id) {
        return this.currentNotesPlaying.splice(i,1);
      }
    }
  }
}
