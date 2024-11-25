import { Config } from './types/config';

export const config: Config = {
  // set unique Streamlabs socket API token
  token: 'TOKEN_HERE',

  // set default amount for timer
  // this amount will set at first then raw time is equal to 0
  // also can change it in data.rawTime.txt file
  timerInit: 60 * 60,

  // set amount for donation don't add time
  // always can add manual if needed
  timerLock: 60 * 10,

  // set minimum donation amount for timer to update
  minAmount: {
    bits: 100,
    donation: 1,
    superchat: 1.5,
    twitchCharity: 1
  },
  // set multiplier in seconds for your preference
  amountMultiplier: {
    manual: 60,
    bits: 1,
    donation: 60,
    superchat: 40,
    twitchCharity: 0,

    // YouTube membership names must be added
    // set number of seconds per YouTube member tier
    // also remove examples
    membershipLevelName: {
      Member: 5 * 60,
      'Example Tier 2': 10 * 60
    },
    // set number of seconds per Twitch subscribtion tier
    twitchTier: {
      1: 5 * 60,
      2: 10 * 60,
      3: 15 * 60
    }
  },
  // edit currency in similar way, add or remove
  // this is multiplier for donated amount
  // also others currencies donates ends up 0 seconds for donate
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
  },
  // possible types: en | lt | hh:mm:ss
  timerType: 'hh:mm:ss'
};
