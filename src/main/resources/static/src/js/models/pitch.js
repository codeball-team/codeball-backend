import _ from 'underscore';

export default function Pitch(pitch) {
  return _({ ...pitch }).defaults({
    id: undefined,
    name: undefined,
    type: undefined,
    address: undefined,
    url: undefined,
    minNumberOfPlayers: undefined,
    maxNumberOfPlayers: undefined
  });
}

export function mapPitch(serverResponse) {
  return Pitch({
    id: serverResponse.id,
    name: serverResponse.name,
    address: serverResponse.address,
    minNumberOfPlayers: serverResponse.minNumberOfPlayers,
    maxNumberOfPlayers: serverResponse.maxNumberOfPlayers
  });
}

export function pitchExample() {
  return Pitch({
    id: 1,
    name: 'Boisko - ul. Św. Filipa',
    type: 5,
    address: 'ul. Św. Filipa 15, Kraków',
    url: 'https://www.facebook.com/Boisko-ul-%C5%9Aw-Filipa-1429435503967371/',
    minNumberOfPlayers: 8,
    maxNumberOfPlayers: 12
  });
}
