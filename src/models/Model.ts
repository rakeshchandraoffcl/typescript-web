import { AxiosPromise } from 'axios';

interface ModelAttributes<T> {
    getAll: T;
    get<K extends keyof T>(key: K): T[K];
    set(update: T): void;
}
interface Sync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}
interface Events {
    on(eventName: string, callback: () => void): void;
    trigger(eventName: string): void;
}

export class Model {}
