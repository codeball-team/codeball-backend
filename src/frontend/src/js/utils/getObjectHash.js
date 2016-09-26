import md5 from 'js-md5';

export default function getObjectHash(object = '') {
  return md5(JSON.stringify(object));
}
