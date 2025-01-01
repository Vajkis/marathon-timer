import { config } from './config';
import { Action, rawTime, updateTimer } from './timer';
import { Event } from './types/event';

interface Message {
  isPreview?: boolean;
  isTest?: boolean;
  repeat?: boolean;
}

interface YoutubeMembership extends Message {
  membershipLevelName: string;
  months: number;
}

interface YoutubeMembershipGift extends Message {
  giftMembershipsCount: number;
  giftMembershipsLevelName: string;
}

interface YoutubeSuperchat extends Message {
  currency: string;
  displayString: string;
}

interface StreamlabsDonation extends Message {
  currency: string;
  formattedAmount: string;
}

interface TwitchBits extends Message {
  amount: number;
}

interface TwitchCharityDonation extends Message {
  currency: string;
  formattedAmount: string;
}

interface TwitchSubscription extends Message {
  sub_plan: string;
}

export function updateManual(amount: number, action: Action): void {
  const multiplier = config.amountMultiplier.manual;

  updateTimer(amount * multiplier, action);
}

export function manageDonations(event: Event<any>): void {
  if (rawTime < config.timerLock) return;

  switch (event.type) {
    case 'bits':
      manageTwitchBits(event);
      break;
    case 'donation':
      manageStreamlabsDonation(event);
      break;
    case 'membershipGift':
      manageYoutubeMembershipGift(event);
      break;
    case 'subscription':
      if (event.for === 'twitch_account') manageTwitchSubscribtion(event);
      if (event.for === 'youtube_account') manageYoutubeMembership(event);
      break;
    case 'superchat':
      manageYoutubeSuperChat(event);
      break;
    case 'twitchcharitydonation':
      manageTwitchCharityDonation(event);
      break;
    default:
  }
}

function manageYoutubeMembership(event: Event<YoutubeMembership>): void {
  const { membershipLevelName, months } = event.message[0];

  const multiplier =
    config.amountMultiplier.membershipLevelName[membershipLevelName];

  if (multiplier) updateTimer(months * multiplier, 'add', event);
  else updateTimer(0, 'add', event);
}

function manageYoutubeMembershipGift(
  event: Event<YoutubeMembershipGift>
): void {
  const { giftMembershipsCount, giftMembershipsLevelName } = event.message[0];

  const multiplier =
    config.amountMultiplier.membershipLevelName[giftMembershipsLevelName];

  if (multiplier) updateTimer(giftMembershipsCount * multiplier, 'add', event);
  else updateTimer(0, 'add', event);
}

function manageYoutubeSuperChat(event: Event<YoutubeSuperchat>): void {
  const { currency, displayString } = event.message[0];

  const multiplier = config.amountMultiplier.superchat;
  const value = getValue(currency, displayString);

  if (value < config.minAmount.superchat) return;
  updateTimer(Math.floor(value * multiplier), 'add', event);
}

function manageStreamlabsDonation(event: Event<StreamlabsDonation>): void {
  const { currency, formattedAmount } = event.message[0];

  const multiplier = config.amountMultiplier.donation;
  const value = getValue(currency, formattedAmount);

  if (value < config.minAmount.donation) return;
  updateTimer(Math.floor(value * multiplier), 'add', event);
}

function manageTwitchBits(event: Event<TwitchBits>): void {
  const { amount } = event.message[0];
  const multiplier = config.amountMultiplier.bits;

  if (amount < config.minAmount.bits) return;
  updateTimer(Math.floor(amount * multiplier), 'add', event);
}

function manageTwitchCharityDonation(
  event: Event<TwitchCharityDonation>
): void {
  const { currency, formattedAmount } = event.message[0];

  const multiplier = config.amountMultiplier.twitchCharity;
  const value = getValue(currency, formattedAmount);

  if (value < config.minAmount.twitchCharity) return;
  updateTimer(Math.floor(value * multiplier), 'add', event);
}

function manageTwitchSubscribtion(event: Event<TwitchSubscription>): void {
  const { sub_plan } = event.message[0];

  switch (sub_plan) {
    case '1000':
      updateTimer(config.amountMultiplier.twitchTier[1], 'add', event);
      break;
    case '2000':
      updateTimer(config.amountMultiplier.twitchTier[2], 'add', event);
      break;
    case '3000':
      updateTimer(config.amountMultiplier.twitchTier[3], 'add', event);
      break;
    default:
  }
}

function getValue(currency: string, displayString: string): number {
  const numericString = displayString.replace(/[^0-9.]/g, '');
  const value = Number(numericString);

  const multiplier = config.currency[currency];

  if (multiplier) return value * multiplier;
  else return 0;
}
