import { TimerType } from './timerType';

export type Config = {
  token: string;
  amount: {
    manual: number;
    bits: number;
    donation: number;
    superchat: number;
    twitchCharity: number;
    membershipLevelName: {
      [key: string]: number;
    };
    twitchTier: {
      1: number;
      2: number;
      3: number;
    };
  };
  currency: {
    [key: string]: number;
  };
  log: {
    donations: boolean;
    timerUpdate: boolean;
  };
  timerType: TimerType;
};
