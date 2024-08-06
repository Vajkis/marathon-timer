import { io } from 'socket.io-client';
import { manageDonations } from './manageDonations';
import { config } from './config';

export function connectToStreamlabs() {
  // Socket token from /socket/token endpoint
  const socketToken = config.token;

  // Connect to socket
  const streamlabs = io(`https://sockets.streamlabs.com?token=${socketToken}`, {
    transports: ['websocket']
  });

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
