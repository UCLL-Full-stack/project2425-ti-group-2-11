import { User } from '@prisma/client';
import { Product } from './product';

interface ShoppingCartPrisma {
    id?: number;
    products: Array<Product>;
    user: User;
}
export class ShoppingCart {
    private id: number | undefined;
    private products: Array<Product>;
    private user: User;

    constructor(shoppingCart: { id?: number | undefined; user: User }) {
        this.id = shoppingCart.id;
        this.products = [];
        this.user = shoppingCart.user;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getProducts(): Array<Product> {
        return this.products;
    }

    public getUser(): User {
        return this.user;
    }

    public addProduct(product: Product): Product {
        this.products.push(product);
        console.log(this.products);
        return product;
    }

    static from({ id, products, user }: ShoppingCartPrisma): ShoppingCart {
        const shoppingCart = new ShoppingCart({ id, user });
        shoppingCart.products = products;
        return shoppingCart;
    }
}
