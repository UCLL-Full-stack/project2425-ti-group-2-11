import { Address } from './address';

export class User {
    private id?: number;
    private name: string;
    private phoneNumber: string;
    private emailAddress: string;
    private password: string;
    private address: Address;
    private seller: boolean;
    private newsLetter: boolean;
    private role: string;

    constructor(user: {
        id?: number;
        name: string;
        phoneNumber: string;
        emailAddress: string;
        password: string;
        address: Address;
        seller: boolean;
        newsLetter: boolean;
        role: string;
    }) {
        this.id = user.id;
        this.name = user.name;
        this.phoneNumber = user.phoneNumber;
        this.emailAddress = user.emailAddress;
        this.password = user.password;
        this.address = user.address;
        this.seller = user.seller;
        this.newsLetter = user.newsLetter;
        this.role = user.role;
    }
    /*
    //setters
    setName = (name: string) => {
        this.name = name;
    };

    setPhoneNumber = (phoneNumber: string) => {
        this.phoneNumber = phoneNumber;
    };

    setEmailAddress = (emailAddress: string) => {
        this.emailAddress = emailAddress;
    };

    setPassword = (password: string) => {
        this.password = password;
    };

    setAddress = (address: string) => {
        this.address = address;
    };

    setSeller = (seller: boolean) => {
        this.seller = seller;
    };

    setNewsLetter = (newsLetter: boolean) => {
        this.newsLetter = newsLetter;
    };

    setRole = (role: string) => {
        this.role = role;
    };
    */
    //getters
    getId(): number | undefined {
        return this.id;
    }
    getName(): string {
        return this.name;
    }
    getPhoneNumber(): string {
        return this.phoneNumber;
    }
    getEmailAddress(): string {
        return this.emailAddress;
    }
    getPassword(): string {
        return this.password;
    }
    getAddress(): Address {
        return this.address;
    }
    getSeller(): boolean {
        return this.seller;
    }
    getNewsLetter(): boolean {
        return this.newsLetter;
    }
    getRole(): string {
        return this.role;
    }

    equals(user: User): boolean {
        return (
            this.id == user.id &&
            this.name == user.name &&
            this.phoneNumber == user.phoneNumber &&
            this.emailAddress == user.emailAddress &&
            this.password == user.password &&
            this.address == user.address &&
            this.seller == user.seller &&
            this.newsLetter == user.newsLetter &&
            this.role == user.role
        );
    }
}
