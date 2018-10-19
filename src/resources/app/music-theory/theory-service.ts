import { MidiMessage } from './../web-midi/midi-message';
import * as Detect from "tonal-detect";

export class TheoryService {
  /**
   * Wrapper around `tonal` music theory library
   */
  constructor() {
  }

  /**
   * Returns chords based on MIDI notes
   * @param midiEvents MIDI notes
   */
  GetChordsForMidiNotes(midiEvents: MidiMessage[]): string[] {
    if (midiEvents.length > 0) {
      const x = midiEvents.map(p => p.letter);
      return Detect.chord(x);
    }
    return [];
  }
}
