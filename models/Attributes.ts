
export class Attributes<T extends object> {

    constructor(private data:T){}

    // you can only get a key of a type T
    get<K extends keyof T>(key: K): T[K] {
        return this.data[key];
    }

    set(update:T):void {
        Object.assign(this.data, update);
    }
}