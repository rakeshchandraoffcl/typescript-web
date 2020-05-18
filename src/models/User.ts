import { Model } from './Model';
import { Eventing } from './Eventing';
import { ApiSync } from './ApiSync';
import { Attribute } from './Attribute';
import { Collection } from './Collection';
export interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

const rootUrl = 'http://localhost:3000/users';
export class User extends Model<UserProps> {
    static buildUser(attrs: UserProps): User {
        return new User(
            new Eventing(),
            new ApiSync<UserProps>(rootUrl),
            new Attribute<UserProps>(attrs)
        );
    }

    static buildUserCollection(): Collection<User, UserProps> {
        return new Collection<User, UserProps>(
            rootUrl,
            (json): User => User.buildUser(json)
        );
    }
}
