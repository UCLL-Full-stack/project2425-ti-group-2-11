type Role = 'User' | 'Admin' | 'Owner';

type AddressInput = {
    id?: number;
    street?: string;
    houseNumber?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
};

type UserInput = {
    id?: number;
    name?: string;
    phoneNumber?: string;
    emailAddress?: string;
    password?: string;
    address?: AddressInput;
    seller?: boolean;
    newsLetter?: boolean;
    role?: Role;
};


type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
};

export type { UserInput, AddressInput, AuthenticationResponse , Role};
