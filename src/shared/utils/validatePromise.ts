const validatePromise = (obj: Promise<any> | null): boolean => {
  return Object.prototype.toString.call(obj) === "[object Promise]";
};

export default validatePromise;
