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
}
