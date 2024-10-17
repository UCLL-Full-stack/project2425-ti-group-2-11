export class Address {
    private id: number | undefined;
    private street: string;
    private city: string;
    private state: string;
    private postalCode: string;
    private country: string;

    constructor(address: { street: string, city: string, state: string, postalCode: string, country: string, id?: number | undefined }) {
        this.id = address.id;
        this.street = address.street;
        this.city = address.city;
        this.state = address.state;
        this.postalCode = address.postalCode;
        this.country = address.country;
    };

    public getId(): number | undefined {
        return this.id;
    };

    public getStreet(): string {
        return this.street;
    }

    public getCity(): string {
        return this.city;
    }

    public getState(): string {
        return this.state;
    }

    public getPostalCode(): string {
        return this.postalCode;
    }

    public getCountry(): string {
        return this.country;
    }

    public equals(address: Address): boolean {
        return (
            this.street == address.street &&
            this.city == address.city &&
            this.state == address.state &&
            this.postalCode == address.postalCode &&
            this.country == address.country
        );
    }

    // public setId(id: number): void {
    //     this.id = id;
    // }

    // public setStreet(street: string): void {
    //     this.street = street;
    // }

    // public setCity(city: string): void {
    //     this.city = city;
    // }

    // public setState(state: string): void {
    //     this.state = state;
    // }

    // public setPostalCode(postalCode: string): void {
    //     this.postalCode = postalCode;
    // }

    // public setCountry(country: string): void {
    //     this.country = country;
    // }
}