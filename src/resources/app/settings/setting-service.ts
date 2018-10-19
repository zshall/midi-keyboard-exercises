import { SettingConstants } from './setting-constants';
export class SettingService {
  /**
   * Wrapper around LocalStorage for getting and setting our settings
   */
  constructor() {
    
  }

  // We only need one active MIDI input device at a time
  get preferredMidiInput(): string {
    return localStorage.getItem(SettingConstants.MIDI_PREFERRED_DEVICE_ID);
  }

  set preferredMidiInput(id: string) {
    localStorage.setItem(SettingConstants.MIDI_PREFERRED_DEVICE_ID, id);
  }

  // Whether to connect automatically when the page loads
  get midiAutoconnect(): boolean {
    return Boolean(JSON.parse(localStorage.getItem(SettingConstants.MIDI_AUTOCONNECT)));
  }

  set midiAutoconnect(enabled: boolean) {
    localStorage.setItem(SettingConstants.MIDI_AUTOCONNECT, JSON.stringify(enabled));
  }

  // Starting octave
  get startingNote(): string {
    return localStorage.getItem(SettingConstants.GAME_NOTE_START)
      ? localStorage.getItem(SettingConstants.GAME_NOTE_START)
      : 'C3';
  }

  set startingNote(note: string) {
    localStorage.setItem(SettingConstants.GAME_NOTE_START, note);
  }

  get endingNote(): string {
    return localStorage.getItem(SettingConstants.GAME_NOTE_END) || 'C5';
  }

  set endingNote(note: string) {
    localStorage.setItem(SettingConstants.GAME_NOTE_END, note);
  }

  // Key of the game
  get musicKey(): string {
    return localStorage.getItem(SettingConstants.GAME_MUSIC_KEY) || 'C';
  }

  set musicKey(key: string) {
    localStorage.setItem(SettingConstants.GAME_MUSIC_KEY, key);
  }

  // Scale of the game
  get musicScale(): string {
    return localStorage.getItem(SettingConstants.GAME_MUSIC_SCALE) || 'major';
  }

  set musicScale(scale: string) {
    localStorage.setItem(SettingConstants.GAME_MUSIC_SCALE, scale);
  }
}
