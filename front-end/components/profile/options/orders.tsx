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
  const [collapsed, setCollapsed] = useState<{ [key: number]: boolean }>({});

  const toggleCollapse = (orderId: number) => {
    setCollapsed((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };

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

        const initialCollapsedState = data.reduce(
          (acc: { [key: number]: boolean }, order: Order) => {
            acc[order.id] = true;
            return acc;
          },
          {}
        );
        setCollapsed(initialCollapsedState);
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
          <div
            key={order.id}
            onClick={() => toggleCollapse(order.id)}
            className="cursor-pointer bg-white rounded shadow-md p-4 my-4"
          >
            <h3>Order ID: {order.id}</h3>
            <p>Bought At: {new Date(order.createdAt).toLocaleString()}</p>
            <h4>Items:</h4>
            {!collapsed[order.id] && (
              <ul>
                {order.items.map((item) => (
                  <li key={item.id} className="flex flex-row items-center">
                    <img
                      src={item.product.media}
                      alt={item.product.name}
                      width="100"
                    />
                    <div className="flex flex-col ml-4 w-full h-full">
                      <p>Product Name: {item.product.name}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.product.price}</p>
                    </div>
                    <div className="flex flex-col ml-4 w-full h-full justify-start">
                      <p className="w-full min-h-full">Description: {item.product.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
