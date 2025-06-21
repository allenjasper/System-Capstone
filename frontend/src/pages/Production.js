import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Production = () => {
  const [productions, setProductions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductions = async () => {
      try {
        const res = await axios.get('/api/reports/production');
        setProductions(res.data);
      } catch (error) {
        console.error('Error fetching production records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductions();
  }, []);

  if (loading) return <div>Loading production records...</div>;

  return (
    <div>
      <h1>Production Records</h1>
      <table>
        <thead>
          <tr>
            <th>Production #</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Produced At</th>
          </tr>
        </thead>
        <tbody>
          {productions.map(prod => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.product_id}</td>
              <td>{prod.quantity}</td>
              <td>{new Date(prod.produced_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>      
    </div>
    );
};
export default Production;
