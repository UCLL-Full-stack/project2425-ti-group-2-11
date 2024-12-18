export type Product = {
    id: string;
    name: string;
    stock: number;
    price: number;
    media: string;
  };
  
  export type CartItem = {
    id: string;
    quantity: number;
    product: Product;
    productId: number;
  };
  
  export type ShoppingCart = {
    id: string;
    items: CartItem[];
    total: number;
  };