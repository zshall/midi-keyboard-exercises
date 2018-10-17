import { Status } from './midi-constants';

export interface MidiMessage extends WebMidi.MIDIMessageEvent {
  status: Status
  note?: string;
  id?: string;
  octave?: number;
  velocity?: number;
  channel?: number;
}
