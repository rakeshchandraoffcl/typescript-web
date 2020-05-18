import { UserForm } from './views/UserForm';
import { User } from './models/User';

const root = document.getElementById('root');

if (root) {
    const form = new UserForm(
        root,
        User.buildUser({ name: 'Rakesh', age: 23 })
    );
    form.render();
} else {
    throw new Error('Cannot find div with id root');
}
