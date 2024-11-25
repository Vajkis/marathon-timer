import { io } from 'socket.io-client';
import { manageDonations } from './manageDonations';
import { config } from './config';

export function connectToStreamlabs() {
  const streamlabs = io(
    `https://sockets.streamlabs.com?token=${config.token}`,
    { transports: ['websocket'] }
  );

  streamlabs.on('connect', () => {
    console.log('Connected to Streamlabs WebSocket');
  });

  streamlabs.on('disconnect', () => {
    console.log('Disconnected from Streamlabs WebSocket');
  });

  streamlabs.on('error', (error) => {
    console.error('WebSocket Error: ', error);
  });

  streamlabs.on('event', (event) => {
    manageDonations(event);
  });
}
