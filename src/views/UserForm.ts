import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserForm extends View<User, UserProps> {
    // constructor(protected parent: Element, protected model: User) {
    //     this.renderOnChange();
    // }

    eventMap = (): { [key: string]: () => void } => {
        return {
            'click:.set-age': this.onSetAge,
            'click:.set-name': this.onSetName,
        };
    };

    onSetAge = (): void => {
        this.model.setRandomAge();
    };

    onSetName = (): void => {
        const input = this.parent.querySelector('input');
        if (input) {
            const name = input.value;
            if (name) this.model.set({ name });
        }
    };

    template = (): string => {
        return `
      <div>
        <h1>User Form </h1>
        <h1>Name: ${this.model.get('name')} </h1>
        <h1>Age: ${this.model.get('age')} </h1>
        <input type="text"/>
        <button class="set-name">Set Name</button>
        <button class="set-age">Random age</button>
      </div>
    
    `;
    };
}
