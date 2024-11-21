type AddressInput = {
    id?: number;
    street?: string;
    houseNumber?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
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
    role?: string;
}

export type {UserInput, AddressInput}