import React from 'react';

const ProductionList = ({ productions }) => (
  <div className="card p-3">
    <h5>Productions</h5>
    <ul className="list-group">
      {productions.map((prod, index) => (
        <li key={index} className="list-group-item">
          {prod.product_name} - {prod.quantity}
        </li>
      ))}
    </ul>
  </div>
);

export default ProductionList;
