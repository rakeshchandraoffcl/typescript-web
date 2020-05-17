// import { UserProps } from './User';

export class Attribute<T> {
    constructor(private data: T) {}

    get<K extends keyof T>(key: K): T[K] {
        return this.data[key];
    }

    set(update: T) {
        Object.assign(this.data, update);
    }
}

// const attr = new Attribute<UserProps>({ name: 'Rakesh', age: 23, id: 2 });

// const name = attr.get('name');
// const age = attr.get('age');
// const id = attr.get('id');