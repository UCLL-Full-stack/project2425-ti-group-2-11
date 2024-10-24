import { Product } from "./product";

export class ShoppingCart {
    private id: number | undefined;
    private products : Array<Product>

    constructor(shoppingCart : {id? : number | undefined}) {
        this.id = shoppingCart.id;
        this.products = []
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getProducts() : Array<Product> {
        return this.products;
    }

    public addProduct(product: Product) : Product {
        this.products.push(product)
        return product;
    }
}