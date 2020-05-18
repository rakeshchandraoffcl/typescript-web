import { UserForm } from './views/UserForm';
import { UserEdit } from './views/UserEdit';
import { User } from './models/User';

const root = document.getElementById('root');

if (root) {
    const userEdit = new UserEdit(
        root,
        User.buildUser({ name: 'Rakesh', age: 23 })
    );
    userEdit.render();
    console.log(userEdit.region);
} else {
    throw new Error('Cannot find div with id root');
}
