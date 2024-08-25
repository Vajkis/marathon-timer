import { config } from './config';
import { Action, updateTimer } from './timer';
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
  const multiplier = config.amount.manual;

  updateTimer(amount * multiplier, action);
}

export function manageDonations(event: Event<any>): void {
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

  const multiplier = config.amount.membershipLevelName[membershipLevelName];

  if (multiplier) updateTimer(months * multiplier, 'add', event);
  else updateTimer(0, 'add', event);
}

function manageYoutubeMembershipGift(
  event: Event<YoutubeMembershipGift>
): void {
  const { giftMembershipsCount, giftMembershipsLevelName } = event.message[0];

  const multiplier =
    config.amount.membershipLevelName[giftMembershipsLevelName];

  if (multiplier) updateTimer(giftMembershipsCount * multiplier, 'add', event);
  else updateTimer(0, 'add', event);
}

function manageYoutubeSuperChat(event: Event<YoutubeSuperchat>): void {
  const { currency, displayString } = event.message[0];

  const multiplier = config.amount.superchat;
  const value = getValue(currency, displayString);

  updateTimer(Math.floor(value * multiplier), 'add', event);
}

function manageStreamlabsDonation(event: Event<StreamlabsDonation>): void {
  const { currency, formattedAmount } = event.message[0];

  const multiplier = config.amount.donation;
  const value = getValue(currency, formattedAmount);

  updateTimer(Math.floor(value * multiplier), 'add', event);
}

function manageTwitchBits(event: Event<TwitchBits>): void {
  const { amount } = event.message[0];
  const multiplier = config.amount.bits;

  updateTimer(Math.floor(amount * multiplier), 'add', event);
}

function manageTwitchCharityDonation(
  event: Event<TwitchCharityDonation>
): void {
  const { currency, formattedAmount } = event.message[0];

  const multiplier = config.amount.twitchCharity;
  const value = getValue(currency, formattedAmount);

  updateTimer(Math.floor(value * multiplier), 'add', event);
}

function manageTwitchSubscribtion(event: Event<TwitchSubscription>): void {
  const { sub_plan } = event.message[0];

  switch (sub_plan) {
    case '1000':
      updateTimer(config.amount.twitchTier[1], 'add', event);
      break;
    case '2000':
      updateTimer(config.amount.twitchTier[2], 'add', event);
      break;
    case '3000':
      updateTimer(config.amount.twitchTier[3], 'add', event);
      break;
    default:
  }
}

function getValue(currency: string, displayString: string): number {
  const numericString = displayString.replace(/[^0-9.,]/g, '');
  const normalizedString = numericString.replace(',', '.');
  const value = Number(normalizedString);

  const multiplier = config.currency[currency];

  if (multiplier) return value * multiplier;
  else return 0;
}
