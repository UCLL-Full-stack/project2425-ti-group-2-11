import { Address } from '../../model/address';
import { User } from '../../model/user';

const address = new Address({
    street: 'Bondgenotenlaan',
    houseNumber: '10',
    city: 'Leuven',
    state: 'Leuven',
    postalCode: '3000',
    country: 'Belgium',
});

const user = new User({
    name: 'John Doe',
    phoneNumber: '0612345678',
    emailAddress: 'email@gmail.com',
    password: 'password',
    address: address,
    seller: false,
    newsLetter: true,
    role: 'User',
});

test('given: valid user info, when: creating user, then: user is created', () => {
    expect(user.getName()).toEqual('John Doe');
    expect(user.getPhoneNumber()).toEqual('0612345678');
    expect(user.getEmailAddress()).toEqual('email@gmail.com');
    expect(user.getPassword()).toEqual('password');
    expect(user.getAddress()).toEqual(address);
    expect(user.getSeller()).toEqual(false);
    expect(user.getNewsLetter()).toEqual(true);
    expect(user.getRole()).toEqual('User');
});
