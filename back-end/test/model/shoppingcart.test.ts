import { Product } from "../../model/product"
import { ShoppingCart } from "../../model/shoppingcart"

test('given: valid shoppingcart info, when: creating shoppingcart, then: shoppingcart is made', () => {
    const shoppingCart = new ShoppingCart({})
    expect(shoppingCart.getProducts().length).toEqual(0)
})

test('give: valid product, when: adding product to cart, then: product is added and returned', () => {
    const product = new Product({name: "Jbl headset", description: "iets", media: "path", stock: 40, price: 90, details: "something"});
    const shoppingCart = new ShoppingCart({});
    const addedProduct = shoppingCart.addProduct(product);

    expect(product).toEqual(addedProduct);
    expect(shoppingCart.getProducts().length).toBe(1);
})