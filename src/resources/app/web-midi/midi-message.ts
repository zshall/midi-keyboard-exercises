import { Status } from './midi-constants';

/**
 * MIDIMessageEvent with additional decoded properties
 */
export interface MidiMessage extends WebMidi.MIDIMessageEvent {
  id?: string;
  status: Status
  note?: string;
  letter?: string;
  octave?: number;
  velocity?: number;
  channel?: number;
  noteProps?: any;
}
