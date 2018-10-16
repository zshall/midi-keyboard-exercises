export class MidiService {
  /**
   * Constructs the MIDI service
   */
  constructor() {
    if (navigator.requestMIDIAccess) {
      console.log('Rarin to rip.');
    } else {
      console.error('This browser does not support web MIDI :(');
    }
  }
}
