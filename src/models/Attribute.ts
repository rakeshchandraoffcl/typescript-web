// import { UserProps } from './User';

export class Attribute<T> {
    constructor(private data: T) {}

    get getAll(): T {
        return this.data;
    }

    get = <K extends keyof T>(key: K): T[K] => {
        return this.data[key];
    };

    set = (update: T) => {
        // this.data = { ...this.data, ...update };
        Object.assign(this.data, update);
    };
}

// const attr = new Attribute<UserProps>({ name: 'Rakesh', age: 23, id: 2 });

// const name = attr.get('name');
// const age = attr.get('age');
// const id = attr.get('id');
