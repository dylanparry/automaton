import { exec } from 'child_process';

export default class Backlight {
  static toMinimumBrightness() {
    try {
      exec('echo 20 > /sys/class/backlight/rpi_backlight/brightness');
    }
    catch (e) { } // eslint-disable-line no-empty
  }

  static toMaximumBrightness = () => {
    try {
      exec('echo 128 > /sys/class/backlight/rpi_backlight/brightness');
    }
    catch (e) { } // eslint-disable-line no-empty
  }
}
