import { UserInfo } from 'os';
import { Address } from '../model/address';
import { User } from '../model/user';
import { UserInput } from '../types';
const users: User[] = [];

const user1: User = new User({
    id: 1,
    name: 'Robin Ghys',
    phoneNumber: '0476577258',
    emailAddress: 'r0997165@ucll.be',
    password: 'password',
    address: new Address({
        id: 1,
        street: 'Kerkstraat',
        houseNumber: '4',
        city: 'Leuven',
        state: 'Vlaams-Brabant',
        postalCode: '3000',
        country: 'Belgium',
    }),
    seller: false,
    newsLetter: true,
    role: 'user',
});

const user2: User = new User({
    id: 2,
    name: 'Tuur Klaasen',
    phoneNumber: '0499999999',
    emailAddress: 'r0997166@ucll.be',
    password: 'wachtwoord',
    address: new Address({
        id: 1,
        street: 'bondgenotenlaan',
        houseNumber: '1',
        city: 'Leuven',
        state: 'Vlaams-Brabant',
        postalCode: '3000',
        country: 'Belgium',
    }),
    seller: true,
    newsLetter: true,
    role: 'admin',
});

users.push(user1);
users.push(user2);

const getAllUsers = (): User[] => {
    return users;
};

const getUserById = (id: number): User | undefined => {
    return users.find((user) => user.getId() === id);
};

const addUser = (user : User): User => {

    users.push(user);
    return user;
}

export default { getAllUsers, getUserById, addUser };
