import { exec } from 'child_process';

export default class Power {
  static shutdown() {
    try {
      exec('sudo shutdown now');
    } catch (e) { } // eslint-disable-line no-empty
  }

  static reboot() {
    try {
      exec('sudo shutdown -r now');
    } catch (e) { } // eslint-disable-line no-empty
  }
}
