import { exec } from 'child_process';

export default class Gpio
{
  static setActive()
  {
    try
    {
      exec('gpio -g write 17 0', () => exec('gpio -g mode 17 out'));
    }
    catch (e)
    {
      // Do nothing
    }
  }

  static setInactive()
  {
    try
    {
      exec('gpio -g write 17 1', () => exec('gpio -g mode 17 out'));
    }
    catch (e)
    {
      // Do nothing
    }
  }
}
