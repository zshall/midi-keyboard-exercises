import { Status } from './midi-constants';

/**
 * MIDIMessageEvent with additional decoded properties
 */
export interface MidiMessage extends WebMidi.MIDIMessageEvent {
  status: Status
  note?: string;
  id?: string;
  octave?: number;
  velocity?: number;
  channel?: number;
}
