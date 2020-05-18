import { User, UserProps } from '../models/User';
import { UserForm } from './UserForm';
import { UserShow } from './UserShow';
import { View } from './View';

export class UserEdit extends View<User, UserProps> {
    regionMap(): { [key: string]: string } {
        return {
            userShow: '.user-show',
            userForm: '.user-form',
        };
    }

    nesting(): void {
        new UserShow(this.region.userShow, this.model).render();
        new UserForm(this.region.userForm, this.model).render();
    }

    template(): string {
        return `
        <div>
            <div class="user-show"></div>
            <div class="user-form"></div>
        </div>
    
    `;
    }
}
