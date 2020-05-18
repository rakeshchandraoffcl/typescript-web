import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
    constructor(protected parent: Element, protected model: T) {
        this.renderOnChange();
    }

    abstract eventMap(): { [key: string]: () => void };
    abstract template(): string;

    renderOnChange = (): void => {
        this.model.on('change', () => {
            this.render();
        });
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
