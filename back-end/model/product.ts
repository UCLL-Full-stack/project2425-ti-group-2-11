export class Product {
    private id: number | undefined;
    private name: string;
    private description: string;
    private media: string; //path to source image
    private stock: number;
    private price: number;
    private details: string;

    constructor(product: {name: string, description: string, media: string, stock: number, price: number, details: string, id?: number | undefined}) {
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.media = product.media;
        this.stock = product.stock;
        this.price = product.price;
        this.details = product.details;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getMedia(): string {
        return this.media;
    }

    public getStock(): number {
        return this.stock;
    }

    public getPrice(): number {
        return this.price;
    }

    public getDetails(): string {
        return this.details;
    }

    public equals(product: Product): boolean {
        return (
            this.name == product.name &&
            this.description == product.description &&
            this.media == product.media &&
            this.stock == product.stock &&
            this.price == product.price &&
            this.details == product.details
        );
    }
}