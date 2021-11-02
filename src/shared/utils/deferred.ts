/**
 * Resolve Javascript promise out of scope of function
 */
const deferred = () => {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { resolve, reject, promise };
};

export default deferred;
