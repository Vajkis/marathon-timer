export type Config = {
  token: string;
  amount: {
    manual: number;
    donation: number;
    superchat: number;
    membershipLevelName: {
      Narys: number;
      'Žalvarinis Narys': number;
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

export type MembershipLevelName = 'Narys' | 'Žalvarinis Narys';
export type Currency = 'EUR' | 'GBP' | 'USD';
// 'AUD' | 'BRL' | 'CAD' | 'CZK' | 'DKK' | 'EUR' | 'HKD' | 'ILS' | 'MYR' | 'MXN' | 'NOK' | 'NZD' | 'PHP' | 'PLN' | 'GBP' | 'RUB' | 'SGD' | 'SEK' | 'CHF' | 'THB' | 'TRY' | 'USD'
// currency codes: https://dev.streamlabs.com/docs/currency-codes

export const config: Config = {
  token: 'TOKEN_HERE',
  amount: {
    manual: 1,
    donation: 3,
    superchat: 2,
    membershipLevelName: {
      Narys: 6,
      'Žalvarinis Narys': 24
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
