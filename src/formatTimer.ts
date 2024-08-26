import { config } from './config';

export function formatTimer(amount: number): string {
  let timerText = '';
  let hoursText = '';
  let minutesText = '';
  let secondsText = '';

  const hours = Math.floor(amount / 3600);
  const minutes = Math.floor((amount % 3600) / 60);
  const seconds = amount % 60;

  switch (config.timerType) {
    case 'en':
      hoursText = `${hours} hour${hours === 1 ? '' : 's'} `;
      minutesText = `${minutes} minute${minutes === 1 ? '' : 's'} `;
      secondsText = `${seconds} second${seconds === 1 ? '' : 's'}`;

      break;
    case 'lt':
      hoursText = `${hours} valand${
        hours % 10 === 1 ? 'a' : hours % 10 === 0 ? 'ų' : 'os'
      } `;
      minutesText = `${minutes} minu${
        minutes % 10 === 1 ? 'tė' : minutes % 10 === 0 ? 'čių' : 'tės'
      } `;
      secondsText = `${seconds} sekund${
        seconds % 10 === 1 ? 'ė' : seconds % 10 === 0 ? 'žių' : 'ės'
      }`;

      break;
    case 'hh:mm:ss':
    default:
      timerText = `${hours < 10 ? '0' : ''}${hours}:${
        minutes < 10 ? '0' : ''
      }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  if (hours) timerText += hoursText;
  if (hours || minutes) timerText += minutesText;
  timerText += secondsText;

  return timerText;
}
