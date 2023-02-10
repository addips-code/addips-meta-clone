import Pusher from 'pusher';
import ClientPusher from 'pusher-js';

export const serverPusher = new Pusher ({
    appId: '1551082',
    key: 'd7230fbd7d595509bd98',
    secret: '97a8b914c9223b73c869',
    cluster: 'ap2',
    useTLS: true,
});

export const clientPusher = new ClientPusher ('d7230fbd7d595509bd98', {
    cluster: 'ap2',
    forceTLS: true,
});