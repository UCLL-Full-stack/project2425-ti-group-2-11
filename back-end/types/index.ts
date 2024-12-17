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

interface ShoppingCartPrisma {
    id?: number;
    products: Array<Product>;
    user: User;
}

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

type UserInputLogin = {
    email: string;
    password: string;
};

type AuthenticationResponse = {
    token: string;
    email: string;
    fullname: string;
    role: Role;
};

export type { UserInput, AddressInput, AuthenticationResponse, Role, UserInputLogin };
