// Thanks to http://www.opensound.com/pguide/midi/midi5.html
export enum Channels {
  // note off
  NOTE_OFF_CHAN_1  = 128,
  NOTE_OFF_CHAN_2  = 129,
  NOTE_OFF_CHAN_3  = 130,
  NOTE_OFF_CHAN_4  = 131,
  NOTE_OFF_CHAN_5  = 132,
  NOTE_OFF_CHAN_6  = 133,
  NOTE_OFF_CHAN_7  = 134,
  NOTE_OFF_CHAN_8  = 135,
  NOTE_OFF_CHAN_9  = 136,
  NOTE_OFF_CHAN_10 = 137,
  NOTE_OFF_CHAN_11 = 138,
  NOTE_OFF_CHAN_12 = 139,
  NOTE_OFF_CHAN_13 = 140,
  NOTE_OFF_CHAN_14 = 141,
  NOTE_OFF_CHAN_15 = 142,
  NOTE_OFF_CHAN_16 = 143,

  // note on
  NOTE_ON_CHAN_1  = 144,
  NOTE_ON_CHAN_2  = 145,
  NOTE_ON_CHAN_3  = 146,
  NOTE_ON_CHAN_4  = 147,
  NOTE_ON_CHAN_5  = 148,
  NOTE_ON_CHAN_6  = 149,
  NOTE_ON_CHAN_7  = 150,
  NOTE_ON_CHAN_8  = 151,
  NOTE_ON_CHAN_9  = 152,
  NOTE_ON_CHAN_10 = 153,
  NOTE_ON_CHAN_11 = 154,
  NOTE_ON_CHAN_12 = 155,
  NOTE_ON_CHAN_13 = 156,
  NOTE_ON_CHAN_14 = 157,
  NOTE_ON_CHAN_15 = 158,
  NOTE_ON_CHAN_16 = 159,

  // ranges of acceptable values and status values
  MIN_VALUE = 0,
  MAX_VALUE = 127,
  MIN_STATUS = 128,
  MAX_STATUS = 255,
}

export enum Status {
  NOTE_OFF,
  NOTE_ON,
  POLYPHONIC_AFTERTOUCH,
  CONTROL_MODE_CHANGE,
  PROGRAM_CHANGE,
  CHANNEL_AFTERTOUCH,
  PITCH_WHEEL_RANGE,
  RT_CLOCK = 248,
  NOT_YET_SUPPORTED = 256
}


export enum Notes {
  C,
  C_SHARP,
  D,
  D_SHARP,
  E,
  F,
  F_SHARP,
  G,
  G_SHARP,
  A,
  A_SHARP,
  B
}

/**
 * Scale intervals start at the root note and go up from there.
 * The position in the list + 1 = the scale degree
 */
export class ScaleIntervals {
  static readonly MAJOR = [2,2,1,2,2,2,1];
  static readonly MINOR = [2,1,2,2,1,2,2];
}
