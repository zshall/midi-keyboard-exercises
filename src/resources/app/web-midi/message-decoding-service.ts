import { Channels, Status } from './midi-constants';
import { MidiMessage } from "./midi-message";
import { Note } from "tonal";

export class MessageDecodingService {
  /**
   * MIDI message decoding service
   */
  constructor() {
  }

  decodeMessage(message: WebMidi.MIDIMessageEvent): MidiMessage {
    const midiMessage = <MidiMessage> message;
    const rawStatus = message.data[0];
    const data1 = message.data[1];
    const data2 = message.data[2];

    midiMessage.status = this.decodeStatus(rawStatus);

    switch(midiMessage.status) {
      case Status.NOTE_OFF:
      case Status.NOTE_ON:
        midiMessage.channel = this.decodeChannel(midiMessage.status, rawStatus);
        midiMessage.velocity = data2;
        midiMessage.id = (midiMessage.target as any).id;

        const note = Note.fromMidi(data1, true);
        if (note) {
          midiMessage.noteProps = Note.props(note);
          midiMessage.note = midiMessage.noteProps.name;
          midiMessage.letter = midiMessage.noteProps.letter;
          midiMessage.octave = midiMessage.noteProps.oct;
        }

        break;
    }

    return midiMessage;
  }

  private decodeStatus(rawStatus): Status {
    if (rawStatus >= Channels.NOTE_OFF_CHAN_1 && rawStatus <= Channels.NOTE_OFF_CHAN_16) {
      return Status.NOTE_OFF;
    }
    if (rawStatus >= Channels.NOTE_ON_CHAN_1 && rawStatus <= Channels.NOTE_ON_CHAN_16) {
      return Status.NOTE_ON;
    }
    return Status.NOT_YET_SUPPORTED;
  }

  private decodeChannel(midiStatus: Status, rawStatus: number): number {
    if (midiStatus === Status.NOTE_OFF) {
      return rawStatus - Channels.NOTE_OFF_CHAN_1 + 1;
    }
    if (midiStatus === Status.NOTE_ON) {
      return rawStatus - Channels.NOTE_ON_CHAN_1 + 1;
    }
    return 0;
  }
}
