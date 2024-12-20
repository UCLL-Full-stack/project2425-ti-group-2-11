import { useEffect, useState } from "react";
import { getOrdersByUserId } from "@/services/cartService";
import { jwtDecode } from "jwt-decode";

const Orders: React.FC = () => {
  interface DecodedToken {
    userId: number;
  }
  interface Product {
    id: number;
    name: string;
    description: string;
    media: string;
    stock: number;
    price: number;
    details: string;
  }
  interface Item {
    id: number;
    quantity: number;
    productId: number;
    product: Product;
  }
  interface Order {
    id: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
    items: Item[];
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (token) {
        const decodedToken = jwtDecode<DecodedToken>(token);
        const userId = Number(decodedToken.userId);
        const response = await getOrdersByUserId(userId, token);
        if (!response.ok) {
          console.log("Failed to fetch orders");
          return;
        }
        const data = await response.json();
        setOrders(data);
        console.log(data);
      }
    };
    fetchOrders();
  }, [token]);

  return (
    <div>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="bg-gray-100 p-4 my-4">
            <h3>Order ID: {order.id}</h3>
            <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>
            <p>Updated At: {new Date(order.updatedAt).toLocaleString()}</p>
            <h4>Items:</h4>
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  <p>Product Name: {item.product.name}</p>
                  <p>Description: {item.product.description}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.product.price}</p>
                  <img
                    src={item.product.media}
                    alt={item.product.name}
                    width="100"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
