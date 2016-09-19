export default function requestManager() {
  const requests = new Map();

  return {
    debounce(key, request) {
      return new Promise(resolve => {
        abortIfPending(key);
        add(key, request);
        resolve();
      });
    },

    forget(key) {
      remove(key);
    },

    throttle(key, request) {
      return new Promise((resolve, reject) => {
        if(!isPending(key)) {
          add(key, request);
          resolve();
        }
        reject();
      });
    }
  };

  function add(key, request) {
    requests.set(key, request);
  }

  function remove(key) {
    requests.delete(key);
  }

  function abortIfPending(key) {
    if(isPending(key)) {
      const request = requests.get(key);
      request.abort();
      remove(key);
    }
  }

  function isPending(key) {
    return requests.has(key);
  }
}
