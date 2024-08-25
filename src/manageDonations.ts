import { config } from './config';
import { Action, updateTimer } from './timer';

export type Event<T> = {
  type: string;
  message: Array<T>;
};

interface Message {
  isPreview?: boolean;
  isTest?: boolean;
  repeat?: boolean;
}

interface Subscription extends Message {
  membershipLevelName: string;
  months: number;
}

interface MembershipGift extends Message {
  giftMembershipsCount: number;
  giftMembershipsLevelName: string;
}

interface Superchat extends Message {
  currency: string;
  displayString: string;
}

interface Donation extends Message {
  currency: string;
  formattedAmount: string;
}

export function updateManual(amount: number, action: Action): void {
  updateTimer(amount, action);
}

export function manageDonations(event: Event<any>): void {
  if (event.type === 'subscription') manageMembership(event);
  if (event.type === 'membershipGift') manageMembershipGift(event);
  if (event.type === 'superchat') manageSuperChat(event);
  if (event.type === 'donation') manageDonation(event);
}

function manageMembership(event: Event<Subscription>): void {
  const { membershipLevelName, months } = event.message[0];

  const multiplier = config.amount.membershipLevelName[membershipLevelName];

  if (multiplier) updateTimer(months * multiplier, 'add', event);
  else updateTimer(0, 'add', event);
}

function manageMembershipGift(event: Event<MembershipGift>): void {
  const { giftMembershipsCount, giftMembershipsLevelName } = event.message[0];

  const multiplier =
    config.amount.membershipLevelName[giftMembershipsLevelName];

  if (multiplier) updateTimer(giftMembershipsCount * multiplier, 'add', event);
  else updateTimer(0, 'add', event);
}

function manageSuperChat(event: Event<Superchat>): void {
  const { currency, displayString } = event.message[0];

  const multiplier = config.amount.superchat;
  const value = Math.floor(getValue(currency, displayString));

  updateTimer(value * multiplier, 'add', event);
}

function manageDonation(event: Event<Donation>): void {
  const { currency, formattedAmount } = event.message[0];

  const multiplier = config.amount.donation;
  const value = Math.floor(getValue(currency, formattedAmount));

  updateTimer(value * multiplier, 'add', event);
}

function getValue(currency: string, displayString: string) {
  const numericString = displayString.replace(/[^0-9.,]/g, '');
  const normalizedString = numericString.replace(',', '.');
  const value = Number(normalizedString);

  const multiplier = config.currency[currency];

  if (multiplier) return value * multiplier;
  else return 0;
}
