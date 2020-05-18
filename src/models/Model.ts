import { AxiosPromise, AxiosResponse, AxiosError } from 'axios';

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

interface HasId {
    id?: number;
}

export class Model<T extends HasId> {
    constructor(
        private events: Events,
        private sync: Sync<T>,
        private attributes: ModelAttributes<T>
    ) {}

    get on() {
        return this.events.on;
    }
    get trigger() {
        return this.events.trigger;
    }
    get get() {
        return this.attributes.get;
    }

    set = (update: T): void => {
        this.attributes.set(update);
        this.events.trigger('change');
    };

    fetch = (): void => {
        const id = this.get('id');

        if (typeof id !== 'number')
            throw new Error('Unable to ferch without an id');

        this.sync.fetch(id).then((response: AxiosResponse): void => {
            this.set(response.data);
        });
    };

    save = (): void => {
        this.sync
            .save(this.attributes.getAll)
            .then((response: AxiosResponse): void => {
                this.trigger('save');
            })
            .catch((error: AxiosError): void => {
                throw new Error(`facing ${error.message}`);
            });
    };
}
