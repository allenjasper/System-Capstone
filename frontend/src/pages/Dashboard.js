import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [sales, setSales] = useState(0);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [productions, setProductions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const salesRes = await axios.get('/api/reports/sales');
        const productsRes = await axios.get('/api/reports/products');
        const inventoryRes = await axios.get('/api/reports/inventory');
        const productionsRes = await axios.get('/api/reports/production');

        setSales(salesRes.data.total_sales);
        setOrders(salesRes.data.orders);
        setProducts(productsRes.data);
        setInventory(inventoryRes.data);
        setProductions(productionsRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <section>
        <h2>Total Sales</h2>
        <p>₱ {sales.toLocaleString()}</p>
      </section>
      <section>
        <h2>Orders</h2>
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              Order #{order.id} - ₱ {order.total_amount} - {order.status}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Products</h2>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name} - ₱ {product.price} - Stock: {product.stock}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Inventory</h2>
        <ul>
          {inventory.map(item => (
            <li key={item.id}>
              {item.name} - Qty: {item.quantity}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Production Records</h2>
        <ul>
          {productions.map(prod => (
            <li key={prod.id}>
              Product ID: {prod.product_id} - Qty: {prod.quantity} - Date: {prod.produced_at}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;