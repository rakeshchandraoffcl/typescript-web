import { User } from './models/User';

const user = new User({ name: 'Aman', age: 22 });

console.log(user.get('name'));

user.on('change', () => {
    console.log('name changed');
});

user.trigger('change');
