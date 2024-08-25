export type Event<T> = {
  type: string;
  message: Array<T>;
};
