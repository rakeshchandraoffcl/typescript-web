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
            'click:.save-model': this.onSaveModel,
        };
    };

    onSaveModel = (): void => {
        this.model.save();
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
       
        <input type="text" placeholder="${this.model.get('name')}"/>
        <button class="set-name">Set Name</button>
        <button class="set-age">Random age</button>
        <button class="save-model">Save</button>
      </div>
    
    `;
    };
}
