import "./App.css";
import { Products } from "./Products";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

// const Product = ({ products }) => (
//   <div className="product-list">
//     {products.map((product, index) => (
//       <div key={index} className="product">
//         <img src={product.productImage} alt={product.productName} />
//         <h3>{product.productName}</h3>
//         <p>Price: ${product.price}</p>
//       </div>
//     ))}
//   </div>
// );



const App = () => {
  const [currentView, setCurrentView] = useState(1);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleCheckout = () => {
    console.log("Checkout for products:", cart);
    setCurrentView(2); // Switch to view 2 when checkout button is pressed
  };

  const Product = ({ products, onCheckout , onAddToCart}) => {
    
  
    const filteredProducts = products.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const handleQuantityChange = (change) => {
      const newQuantity = Math.max(0, quantity + change);
      setQuantity(newQuantity);
    };
  
    const handleAddToCart = (product) => {
      onAddToCart({ ...product, quantity });
      setQuantity(0); // Reset quantity after adding to cart
      setCart({ ...cart, [product.productName]: quantity });
    };
  
    return (
      <div className="product-list">
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredProducts.map((product, index) => (
          <div>
            <div key={index} className="product">
              <img
                src={require(`${product.productImage}`).default}
                alt={product.productName}
              />
              <h3>{product.productName}</h3>
              <p>Price: ${product.price}</p>
              <button onClick={() => {handleQuantityChange(-1); handleAddToCart(product)}}>-</button>
              <input type="text" value={quantity} readOnly />
              <button onClick={() => {handleQuantityChange(1); handleAddToCart(product)}}>+</button>
            </div>
          </div>
        ))}
        <button onClick={() => onCheckout()}>Checkout</button>
      </div>
    );
  };

  return (
    <div className="app">
      {currentView === 1 && (
        <div>
          <h1>Product Catalog</h1>
          <Product products={Products} onCheckout={handleCheckout} onAddToCart={handleAddToCart} />
        </div>
      )}
      {currentView === 2 && <h1>View 2</h1>}
    </div>
  );
};

export default App;
