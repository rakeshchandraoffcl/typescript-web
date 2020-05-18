import { AxiosResponse, AxiosError } from 'axios';
import { Eventing } from './Eventing';
import { Sync } from './Sync';
import { Attribute } from './Attribute';

export interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

const rootUrl = 'http://localhost:3000/users';
export class User {
    public events: Eventing = new Eventing();
    public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
    public attribute: Attribute<UserProps>;

    constructor(userProps: UserProps) {
        this.attribute = new Attribute<UserProps>(userProps);
    }

    get on() {
        return this.events.on;
    }
    get trigger() {
        return this.events.trigger;
    }
    get get() {
        return this.attribute.get;
    }

    set = (update: UserProps): void => {
        this.attribute.set(update);
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
            .save(this.attribute.getAll)
            .then((response: AxiosResponse): void => {
                this.trigger('save');
            })
            .catch((error: AxiosError): void => {
                throw new Error(`facing ${error.message}`);
            });
    };
}
