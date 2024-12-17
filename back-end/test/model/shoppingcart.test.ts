import { Product } from "../../model/product"
import { ShoppingCart } from "../../model/shoppingcart"

test('given: valid shoppingcart info, when: creating shoppingcart, then: shoppingcart is made', () => {
    const user = {
        password: 'password123',
        name: 'John Doe',
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        phoneNumber: '1234567890',
        emailAddress: 'john.doe@example.com',
        seller: false,
        newsLetter: true,
        role: 'User',
        addressId: 1
    };
    const shoppingCart = new ShoppingCart({ user })
    expect(shoppingCart.getProducts().length).toEqual(0)
})

test('give: valid product, when: adding product to cart, then: product is added and returned', () => {
    const user = {
        password: 'password123',
        name: 'John Doe',
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        phoneNumber: '1234567890',
        emailAddress: 'john.doe@example.com',
        seller: false,
        newsLetter: true,
        role: 'User',
        addressId: 1
    };
    const product = new Product({name: "Jbl headset", description: "iets", media: "path", stock: 40, price: 90, details: "something"});
    const shoppingCart = new ShoppingCart({user});
    const addedProduct = shoppingCart.addProduct(product);

    expect(product).toEqual(addedProduct);
    expect(shoppingCart.getProducts().length).toBe(1);
})