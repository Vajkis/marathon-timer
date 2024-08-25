export type Event<T> = {
  type:
    | 'bits'
    | 'donation'
    | 'membershipGift'
    | 'subscription'
    | 'superchat'
    | 'twitchcharitydonation';
  message: Array<T>;
  for: 'youtube_account' | 'twitch_account';
};
