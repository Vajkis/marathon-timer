import { Config } from './types/config';

export const config: Config = {
  // set unique token
  token: 'TOKEN_HERE',
  // set multiplier for your preference
  amount: {
    manual: 1,
    donation: 3,
    superchat: 2,
    // YouTube membership names must be added
    // set number of minutes per member tier
    // also remove examples
    membershipLevelName: {
      Member: 6,
      'Examples Tier 2': 24
    }
  },
  // edit currency in similar way, add or remove
  // this is multiplier for donated amaunt, that will be converted in a minutes
  // also others currencies donates ends up 0 minutes for donate
  // currency codes: https://dev.streamlabs.com/docs/currency-codes
  currency: {
    EUR: 1,
    USD: 0.9,
    GBP: 1.1
  },
  // set true or false for loggin event to files
  // donations logs useful for debugging
  // if all working - set it false for less storage usage
  log: {
    donations: true,
    timerUpdate: true
  }
};
