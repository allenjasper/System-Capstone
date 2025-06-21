import React from 'react';

const InventoryList = ({ items }) => (
  <div className="card p-3">
    <h5>Inventory List</h5>
    <ul className="list-group">
      {items.map((item, index) => (
        <li key={index} className="list-group-item">
          {item.item_name} - {item.quantity}
        </li>
      ))}
    </ul>
  </div>
);

export default InventoryList;
