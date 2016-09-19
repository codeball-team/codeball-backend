import { _ } from 'utils';

export default function periodicCallback(delay) {
  if(!delay) {
    return nullPeriodicCallback();
  }

  let intervalDescriptor = null;
  let intervalCallback = _.noop;

  return {
    start(callback) {
      intervalCallback = callback;
      intervalCallback();
      intervalDescriptor = setInterval(intervalCallback, delay);
    },

    restart() {
      this.end();
      this.start(intervalCallback);
    },

    end() {
      clearInterval(intervalDescriptor);
    }
  };
}

function nullPeriodicCallback() {
  let intervalCallback = _.noop;

  return {
    start(callback) {
      intervalCallback = callback;
      intervalCallback();
    },

    restart() {
      this.start(intervalCallback);
    },

    end: _.noop
  };
}
