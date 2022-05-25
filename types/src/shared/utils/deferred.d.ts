/**
 * Resolve Javascript promise out of scope of function
 */
declare const deferred: () => {
    resolve: any;
    reject: any;
    promise: Promise<unknown>;
};
export default deferred;
