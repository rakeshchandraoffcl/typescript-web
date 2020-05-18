import { User } from './models/User';

const user = new User({ id: 1, name: 'new Name' });

user.on('save', () => {
    console.log('saved');
});

user.save();
