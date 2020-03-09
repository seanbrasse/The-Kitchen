/**
 * Wraps a Promise and allows it to be resolved or rejected later.
 * Via: https://github.com/eternagame/EternaJS/blob/bf4d3cc3722cf188a85e2e2b4f623057a127c8b2/src/flashbang/util/Deferred.ts
 */
export default class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }

    /** True if the promise has been resolved or rejected */
    get isSealed() {
        return this._resolve == null;
    }

    resolve(value) {
        if (this.isSealed) {
            throw new Error("Can't resolve sealed promise");
        }

        let fn = this._resolve;
        this._resolve = null;
        this._reject = null;
        fn(value);
    }

    reject(reason) {
        if (this.isSealed) {
            throw new Error("Can't reject sealed promise");
        }

        let fn = this._reject;
        this._resolve = null;
        this._reject = null;
        fn(reason);
    }
}