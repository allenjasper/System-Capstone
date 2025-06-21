import React from 'react';

const OrderList = ({ orders }) => (
  <div className="card p-3">
    <h5>Orders</h5>
    <ul className="list-group">
      {orders.map((order, index) => (
        <li key={index} className="list-group-item">
          Status: {order.status}
        </li>
      ))}
    </ul>
  </div>
);

export default OrderList;
