import React from 'react'

interface Product {
  name : string;
  score : number;
}

interface ProductListProps {
  products: Product[];
}

const ItemsAttribute : React.FC<ProductListProps> = ({ products }) => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Product List</h1>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {products.map((product, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 15px',
              borderBottom: '1px solid #ccc',
            }}
          >
            <span>{product.name}</span>
            <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>
              {product.score} pts
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsAttribute
