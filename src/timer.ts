import path from 'path';
import fs from 'fs';
import { Event } from './manageDonations';
import { config } from './config';
import { formatTimer } from './formatTimer';

let timer!: NodeJS.Timeout;
let rawTime = 0;

export function startTimer(amount: number): void {
  rawTime = amount;
  timer = setInterval(() => {
    if (rawTime-- <= 0) {
      clearInterval(timer);
      return;
    }

    fs.writeFile(
      path.join(__dirname, '../data/rawTime.txt'),
      String(rawTime),
      'utf8',
      (error) => {
        if (error) {
          console.error('Error reading file:', error);
          return;
        }
      }
    );

    fs.writeFile(
      path.join(__dirname, '../data/timer.txt'),
      formatTimer(rawTime),
      'utf8',
      (error) => {
        if (error) {
          console.error('Error reading file:', error);
          return;
        }
      }
    );
  }, 1000);
}

export type Action = 'add' | 'remove';

export function updateTimer(
  minutes: number,
  action: Action,
  event?: Event<any>
): void {
  const seconds = minutes * 60;

  const repeat = event?.message[0]?.repeat;
  const isPreview = event?.message[0]?.isPreview;
  const isTest = event?.message[0]?.isTest;

  if (!repeat && !isPreview && !isTest) {
    switch (action) {
      case 'add':
        rawTime += seconds;
        break;
      case 'remove':
        rawTime = Math.max(rawTime - seconds, 1);
        break;
      default:
    }
  }

  const currentTime = new Date().toLocaleString('lt-LT');

  let timerUpdateLog = `[${currentTime}] type: ${
    event?.type || 'manual'
  } | minutes: ${minutes}`;

  if (repeat) timerUpdateLog += ' | repeat: true';
  if (isPreview) timerUpdateLog += ' | isPreview: true';
  if (isTest) timerUpdateLog += ' | isTest: true';

  if (config.log.timerUpdate) {
    fs.appendFile(
      path.join(__dirname, '../data/timerUpdate.log'),
      timerUpdateLog + '\n',
      'utf8',
      (error) => {
        if (error) {
          console.error('Error reading file:', error);
          return;
        }
      }
    );
  }

  if (config.log.donations) {
    if (event) {
      fs.appendFile(
        path.join(__dirname, '../data/donations.log'),
        JSON.stringify(event, null, 2) + '\n',
        'utf8',
        (error) => {
          if (error) {
            console.error('Error reading file:', error);
            return;
          }
        }
      );
    }
  }
}
