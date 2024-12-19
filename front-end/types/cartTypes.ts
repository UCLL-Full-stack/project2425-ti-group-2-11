export interface Product {
  id: number;
  name: string;
  price: number;
  media: string;
  stock: number;
  
}
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
