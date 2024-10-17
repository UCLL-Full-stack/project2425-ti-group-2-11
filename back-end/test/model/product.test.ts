import { Product } from "../../model/product";

const VALID_NAME = 'JBL hoofdtelefoon';
const VALID_DESCRIPTION = 'Een jbl hoofdtelefoon met noice canceling';
const VALID_MEDIA = '/home/media/jbl.png'
const VALID_STOCK = 50;
const VALID_PRICE = 90;
const VALID_DETAILS = 'noice canceling, max volume: 120db'

test('given: valid product info, when: creating product, then: product is created', () => {
    const product = new Product({ name: VALID_NAME, description: VALID_DESCRIPTION, media: VALID_MEDIA, stock: VALID_STOCK, price: VALID_PRICE, details: VALID_DETAILS });

    expect(product.getName()).toEqual(VALID_NAME);
    expect(product.getDescription()).toEqual(VALID_DESCRIPTION);
    expect(product.getMedia()).toEqual(VALID_MEDIA);
    expect(product.getStock()).toEqual(VALID_STOCK);
    expect(product.getPrice()).toEqual(VALID_PRICE);
    expect(product.getDetails()).toEqual(VALID_DETAILS);
});

test('given: to identical products, when: asking if equal, then: true is returned', () => {
    const product1 = new Product({ name: VALID_NAME, description: VALID_DESCRIPTION, media: VALID_MEDIA, stock: VALID_STOCK, price: VALID_PRICE, details: VALID_DETAILS });
    const product2 = new Product({ name: VALID_NAME, description: VALID_DESCRIPTION, media: VALID_MEDIA, stock: VALID_STOCK, price: VALID_PRICE, details: VALID_DETAILS });

    expect(product1.equals(product2)).toBe(true);
})