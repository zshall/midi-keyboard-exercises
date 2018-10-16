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
      input.onmidimessage = this.processIncomingMidiMessage;
    }
  }

  releaseInput(key: string) {
    const input = this.midiAccess.inputs.get(key);
    if (input) {
      input.onmidimessage = null;
    }
  }

  processIncomingMidiMessage(midiMessage: WebMidi.MIDIMessageEvent) {
    console.log(midiMessage);
  }

}
