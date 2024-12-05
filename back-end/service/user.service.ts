import { Address } from '../model/address';
import { User } from '../model/user';
import userDb from '../repository/user.db';
import { UserInput, AddressInput } from '../types';

const getAllUsers = async (): Promise<User[]> => {
    return [...(await userDb.getAllUsers())];
};

const getUserById = async (id: number): Promise<User | undefined> => {
    const user = await userDb.getUserById({ id });
    if (user) {
        return user;
    }
    throw new Error(`User with id ${id} not found`);
};

const getUserByEmail = async (emailAddress: string): Promise<User | undefined> => {
    const user = await userDb.getUserByEmail({ emailAddress });
    if (user) {
        return user;
    }
    throw new Error(`User with email ${emailAddress} not found`);
};

const addUser = async ({
    name,
    phoneNumber,
    emailAddress,
    password,
    address,
    seller,
    newsLetter,
    role,
}: UserInput): Promise<User> => {
    if (!name) {
        throw new Error('Name is missing');
    }
    if (!phoneNumber) {
        throw new Error('Phone number is missing');
    }
    if (!emailAddress) {
        throw new Error('Email address is missing');
    }
    if (!password) {
        throw new Error('Password is missing');
    }
    if (seller === undefined) {
        throw new Error('Seller status is missing');
    }
    if (newsLetter === undefined) {
        throw new Error('Newsletter status is missing');
    }
    if (!role) {
        throw new Error('Role is missing');
    }
    // if (!address) {
    //     throw new Error('Address is missing');
    // }

    const { street, houseNumber, city, state, postalCode, country } = address as AddressInput;

    if (!street) {
        throw new Error('Address street is missing');
    }
    if (!houseNumber) {
        throw new Error('Address house number is missing');
    }
    if (!city) {
        throw new Error('Address city is missing');
    }
    if (!state) {
        throw new Error('Address state is missing');
    }
    if (!postalCode) {
        throw new Error('Address postal code is missing');
    }
    if (!country) {
        throw new Error('Address country is missing');
    }

    const addressInstance = new Address({ street, houseNumber, city, state, postalCode, country });
    const user = new User({
        name,
        phoneNumber,
        emailAddress,
        password,
        address: addressInstance,
        seller,
        newsLetter,
        role,
    });
    await userDb.addUser(user);
    return user;
};

export default { getAllUsers, getUserById, addUser, getUserByEmail };
