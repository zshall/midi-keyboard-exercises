import { SettingService } from './../settings/setting-service';
import { MidiMessage } from './midi-message';
import { MessageDecodingService } from './message-decoding-service';
import { EventAggregator } from "aurelia-event-aggregator";
import { autoinject } from "aurelia-framework";
import { Status, MidiEvents } from './midi-constants';
import {BindingSignaler} from 'aurelia-templating-resources';

@autoinject
export class MidiService {
  isActive: boolean;
  isUnsupported: boolean;
  currentNotesPlaying: MidiMessage[] = [];

  /**
   * Constructs the MIDI service
   */
  constructor(private midiAccess: WebMidi.MIDIAccess,
              private eventAggregator: EventAggregator,
              private messageDecodingService: MessageDecodingService,
              private settingService: SettingService,
              private signaler: BindingSignaler) {
    this.activate();
  }

  /**
   * Requests MIDI access and starts up
   */
  async activate() {
    if (navigator.requestMIDIAccess) {
      console.log('Rarin to rip.');

      this.midiAccess = await navigator.requestMIDIAccess();

      console.log('MIDI ready!');
      for (var input of this.midiAccess.inputs.keys()) {
        console.log(input);
      }

      this.isActive = true;

      if (this.settingService.preferredMidiInput && this.settingService.midiAutoconnect) {
        this.captureInput(this.settingService.preferredMidiInput);
      }
    } else {
      console.error('This browser does not support web MIDI :(');

      this.isUnsupported = true;
    }
  }

  /**
   * Returns the names of the MIDI inputs or outputs for display
   * @param enumerator list of MIDI inputs and outputs
   */
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

  /**
   * Returns the list of MIDI input devices
   */
  inputNames() {
    return this.getNames(this.midiAccess.inputs);
  }

  /**
   * Returns the list of MIDI output devices
   */
  outputNames() {
    return this.getNames(this.midiAccess.outputs);
  }
  
  /**
   * Subscribes to the MIDI input's `onmidimessage` event
   * @param connectionId the key of the midiAccess.inputs enumerator
   */
  captureInput(connectionId: string) {
    const input = this.midiAccess.inputs.get(connectionId);
    if (input) {
      this.settingService.preferredMidiInput = connectionId;
      input.onmidimessage = midiMessage => {
        //this.eventAggregator.publish('midiEvent', midiMessage);
        const decodedNote = this.messageDecodingService.decodeMessage(midiMessage);
        switch(decodedNote.status) {
          case Status.NOTE_OFF:
            this.removeCurrentNote(decodedNote);
            this.eventAggregator.publish(MidiEvents.NOTE_OFF, decodedNote);
            break;
          case Status.NOTE_ON:
            this.currentNotesPlaying.push(decodedNote);
            this.eventAggregator.publish(MidiEvents.NOTE_ON, decodedNote);
            break;
        }
      }
      this.signaler.signal('connect-signal');
    } else {
      this.settingService.midiAutoconnect = false;
    }
  }

  /**
   * Disconnects from the MIDI input
   * @param connectionId the key of the midiAccess.inputs enumerator
   */
  releaseInput(connectionId: string) {
    const input = this.midiAccess.inputs.get(connectionId);
    if (input) {
      input.onmidimessage = null;
      this.settingService.midiAutoconnect = false;
      this.signaler.signal('connect-signal');
    }
  }

  /**
   * Whether the input is connected or not.
   * @param connectionId the key of the midiAccess.inputs enumerator
   * @returns whether the input is currently connected
   */
  isConnected(connectionId: string): boolean {
    const input = this.midiAccess.inputs.get(connectionId);
    return Boolean(input && input.onmidimessage);
  }

  /**
   * Convenience method for connecting or disconnecting from the preferred MIDI input
   * This is used in "Connect / Disconnect" buttons
   * @returns whether the input is currently connected
   */
  togglePreferredInputConnect(): boolean {
    const input = this.settingService.preferredMidiInput;
    if (this.isConnected(input)) {
      this.releaseInput(input);
    } else {
      this.captureInput(input);
      this.settingService.midiAutoconnect = true;
    }
    return this.isConnected(input);
  }

  /**
   * Removes the note from the list of currently playing notes
   * @param note the note to remove from the list
   */
  removeCurrentNote(note: MidiMessage) {
    for (let i = 0; i < this.currentNotesPlaying.length; i++) {
      const val = this.currentNotesPlaying[i];
      if (val.channel === note.channel && val.octave == note.octave
        && val.note === note.note && val.id == note.id) {
        return this.currentNotesPlaying.splice(i,1);
      }
    }
  }
}
