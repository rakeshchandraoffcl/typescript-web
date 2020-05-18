import { User, UserProps } from './User';
import { Eventing } from './Eventing';
import axios, { AxiosResponse, AxiosError } from 'axios';

export class Collection<T, K> {
    collections: T[] = [];
    events: Eventing = new Eventing();

    constructor(private rootUrl: string, private deserialize: (json: K) => T) {}

    get on() {
        return this.events.on;
    }
    get trigger() {
        return this.events.trigger;
    }

    fetch = (): void => {
        axios
            .get(this.rootUrl)
            .then((response: AxiosResponse): void => {
                response.data.forEach((user: K): void => {
                    this.collections.push(this.deserialize(user));
                });
                this.trigger('change');
            })
            .catch((error: AxiosError): void => {
                throw new Error(`${error.message}`);
            });
    };
}
