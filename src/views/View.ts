import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
    constructor(protected parent: Element, protected model: T) {
        this.renderOnChange();
    }

    abstract template(): string;

    region: { [key: string]: Element } = {};
    regionMap(): { [key: string]: string } {
        return {};
    }

    eventMap = (): { [key: string]: () => void } => {
        return {};
    };

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

    bindRegions(fragment: DocumentFragment): void {
        const regions = this.regionMap();

        for (let key in regions) {
            const selector = regions[key];
            const element = fragment.querySelector(selector);
            if (element) {
                this.region[key] = element;
            }
        }
    }

    nesting(): void {}

    render = (): void => {
        this.parent.innerHTML = '';
        const template = document.createElement('template');
        template.innerHTML = this.template();
        this.bindEvents(template.content);
        this.bindRegions(template.content);
        this.nesting();
        this.parent.append(template.content);
    };
}
