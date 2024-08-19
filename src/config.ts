// YouTube membership names must be added at:
//   type Config.amount.membershipLevelName
//   type MembershipLevelName
//   const Config.amount.membershipLevelName
// also remove examples

// edit currency in similar way, add or remove at:
//   type Config.currency
//   type Currency
//   const Config.currency
// this is multiplier for donated amaunt, that will be converted in a minutes
// also others currencies donates ends up 0 minutes for donate
// currency codes: https://dev.streamlabs.com/docs/currency-codes

export type Config = {
  token: string;
  amount: {
    manual: number;
    donation: number;
    superchat: number;
    membershipLevelName: {
      Member: number;
      'Examples Tier 2': number;
    };
  };
  currency: {
    EUR: number;
    USD: number;
    GBP: number;
  };
  log: {
    donations: boolean;
    timerUpdate: boolean;
  };
};

export type MembershipLevelName = 'Member' | 'Examples Tier 2';
export type Currency = 'EUR' | 'GBP' | 'USD';

export const config: Config = {
  token: 'TOKEN_HERE',
  amount: {
    manual: 1,
    donation: 3,
    superchat: 2,
    membershipLevelName: {
      Member: 6,
      'Examples Tier 2': 24
    }
  },
  currency: {
    EUR: 1,
    USD: 0.9,
    GBP: 1.1
  },
  log: {
    donations: true,
    timerUpdate: true
  }
};
