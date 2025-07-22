import { io } from 'socket.io-client';

const URL = `${window.location.origin}/${window.location.host}`;

export const socket = io(URL);