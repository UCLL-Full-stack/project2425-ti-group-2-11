import { UserInfo } from 'os';
import { Address } from '../model/address';
import { User } from '../model/user';
import { UserInput } from '../types';
import database from './database';
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

const addUser = async (user: User): Promise<User> => {
    try {
        const UserPrisma = await database.user.create({
            data: {
                name: user.getName(),
                phoneNumber: user.getPhoneNumber(),
                emailAddress: user.getEmailAddress(),
                password: user.getPassword(),
                address: {
                    create: {
                        street: user.getAddress().getStreet(),
                        houseNumber: user.getAddress().getHouseNumber(),
                        city: user.getAddress().getCity(),
                        state: user.getAddress().getState(),
                        postalCode: user.getAddress().getPostalCode(),
                        country: user.getAddress().getCountry(),
                    }
                },
                seller: user.getSeller(),
                newsLetter: user.getNewsLetter(),
                role: user.getRole()
            },
        });
        return User.from({
            ...UserPrisma,
            address: {
                id: UserPrisma.addressId,
                street: user.getAddress().getStreet(),
                houseNumber: user.getAddress().getHouseNumber(),
                city: user.getAddress().getCity(),
                state: user.getAddress().getState(),
                postalCode: user.getAddress().getPostalCode(),
                country: user.getAddress().getCountry(),
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { getAllUsers, getUserById, addUser };
