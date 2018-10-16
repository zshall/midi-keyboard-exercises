export class MidiService {
  /**
   * Constructs the MIDI service
   */
  constructor(private midiAccess: WebMidi.MIDIAccess, public isActive: boolean, public isUnsupported: boolean) {
    this.activate();
  }

  async activate() {
    if (navigator.requestMIDIAccess) {
      console.log('Rarin to rip.');

      this.midiAccess = await navigator.requestMIDIAccess();

      console.log('MIDI ready!');

      // for (let entry of this.midiAccess.inputs) {
      //   console.log(entry[1]);
      // }
      console.log(this.inputNames);

      this.isActive = true;
    } else {
      console.error('This browser does not support web MIDI :(');

      this.isUnsupported = true;
    }
  }

  private getNames(enumerator: Map<string, WebMidi.MIDIPort>) {
    const names = [];
    enumerator.forEach(p => names.push(p.name));
    return names;
  }

  get inputNames() {
    return this.getNames(this.midiAccess.inputs);
  }

  get outputNames() {
    return this.getNames(this.midiAccess.outputs);
  }
  
}
