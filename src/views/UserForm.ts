import { User } from '../models/User';

export class UserForm {
    constructor(private parent: Element, private model: User) {
        this.renderOnChange();
    }

    renderOnChange = (): void => {
        this.model.on('change', () => {
            this.render();
        });
    };

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

    bindEvents = (fragment: DocumentFragment): void => {
        const events = this.eventMap();
        for (const eventKey in events) {
            const [event, selector] = eventKey.split(':');
            fragment
                .querySelectorAll(selector)
                .forEach((element: Element): void => {
                    element.addEventListener(event, events[eventKey]);
                });
        }
    };

    render = (): void => {
        this.parent.innerHTML = '';
        const template = document.createElement('template');
        template.innerHTML = this.template();
        this.bindEvents(template.content);
        this.parent.append(template.content);
    };
}