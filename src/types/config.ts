export type Config = {
  token: string;
  amount: {
    manual: number;
    donation: number;
    superchat: number;
    membershipLevelName: {
      [key: string]: number;
    };
  };
  currency: {
    [key: string]: number;
  };
  log: {
    donations: boolean;
    timerUpdate: boolean;
  };
};
