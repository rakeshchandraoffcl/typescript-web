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
}
