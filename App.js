import "./App.css";
import { Products } from "./Products";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";


const App = () => {
  const [currentView, setCurrentView] = useState(1);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const {register, handleSubmit, formState: { errors }} = useForm();
  const [dataF, setDataF] = useState({});
  const [totalItems, setTotalItems] = useState(0)
  const [totalCost, setTotalCost] = useState(0)

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    console.log(cart);
    setTotalItems(Number(totalItems + 1))
    setTotalCost(Number(totalCost + product.price))
  };

  const handleCheckout = () => {
    console.log("Checkout for products:", cart);
    setCurrentView(2); // Switch to view 2 when checkout button is pressed
  };

  const Product = ({ products, onCheckout}) => {
    const filteredProducts = products.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleRemoveFromCart = (product) => {
      let hardCopy = [...cart];
      setTotalItems(totalItems - Number(howManyofThis(product)))
      setTotalCost(totalCost - Number(howManyofThis(product) * product.price))
      hardCopy = hardCopy.filter((cartItem) => cartItem.id !== product.id);
      setCart(hardCopy);

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
              <h3>{product.productName}</h3>
              <img
                src={product.productImage}
                alt={product.productName}
                width={150}
                height={100}
              />
              <p>Price: ${product.price}</p>
              <button onClick={() => {handleRemoveFromCart(product)}}>-</button>
              <input type="text" value={howManyofThis(product.id)} readOnly />
              <button onClick={() => {handleAddToCart(product)}}>+</button>
            </div>
          </div>
        ))}
        <button onClick={() => (onCheckout())}>Checkout</button>
      </div>
    );
  };

  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }

  function RenderCart() {
    return (
    <div className="row">
      {Products.map((product) => (
        howManyofThis(product.id) > 0 && 
        <div className="row">
          <p className="col">{product.productName}</p>
          <div className="col">        
            <img src={product.productImage} alt={product.productName} width={150} height={100}></img>
          </div>
          <p className="col">{howManyofThis(product.id)}</p>
          <p className="col">{howManyofThis(product.id)} x ${product.price} = ${howManyofThis(product.id) * product.price}</p>
        </div>
      ))}
    </div>
    );
  };

  function Payment(){    
    const onSubmit = data => {
        setDataF(data);
        setCurrentView(3);
        
    }

    function backToProducts() {
      setCurrentView(1)
    }

    return(
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
          <h1>Checkout</h1>
          <div className="row">
              <p className="col"><strong>Product</strong></p>
              <p className="col"><strong>Image</strong></p>
              <p className="col"><strong>Quantity</strong></p>
              <p className="col"><strong>Price</strong></p>
          </div>
          <hr></hr>
          <div>
            <RenderCart/>
          </div>
          <hr></hr>
          <div className="row">
            <p className="col">{totalItems}</p>
            <p className="col">{totalCost}</p>
          </div>
          <h1>Payment Information</h1>
          <div className="row">
            <div className="form-group col gap">
                <input {...register("fullName", { required: true })} placeholder="Full Name" className="form-control" />
            </div>
            <div className="form-group col gap">
                <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" className="form-control"/>
            </div>
          </div>
          <div className="form-group gap">
              <input {...register("creditCard", { required: true, minLength: 16, maxLength: 16})} placeholder="Credit Card" className="form-control"/>  
          </div>
          <div className="row">
            <div className="form-group col gap">
                <input {...register("address", { required: true })} placeholder="Address" className="form-control"/>
            </div>
            <div className="form-group col gap">
                <input {...register("address2")} placeholder="Address 2" className="form-control"/>
            </div>
          </div>
          <div className="row">
            <div className="form-group col gap">
              <input {...register("city", { required: true })} placeholder="City" className="form-control"/>
            </div>
            <div className="form-group col gap">
              <input {...register("state", { required: true })} placeholder="State" className="form-control"/>
            </div>
            <div className="form-group col">
              <input {...register("zip", { required: true, minLength: 5, maxLength: 5})} placeholder="Zip" className="form-control"/>
            </div>
          </div>
        
        <div className="row">
          <div className="col">
            {errors.fullName && <p className="text-danger">Full Name is required.</p>}
          </div>
          <div className="col">
            {errors.email && <p className="text-danger">Email is required.</p>} 
          </div>
          <div className="col">
            {errors.creditCard && <p className="text-danger">Credit Card is required.</p>}
          </div>
          <div className="col">
            {errors.address && <p className="text-danger">Address is required.</p>}
          </div>
          <div className="col">
            {errors.city && <p className="text-danger">City is required.</p>}
          </div>
          <div className="col">
            {errors.state && <p className="text-danger"> State is required.</p>}
          </div>
          <div className="col">
            {errors.zip && <p className="text-danger">Zip is required.</p>}
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-success spacer">Submit</button>
          <button type="button" className="btn btn-warning" onClick={backToProducts}>Return</button>
        </div>
            
        </form>
    </div>
    );
  }


  function Summary(){
    const updateHooks = ()=>{
        setCurrentView(1);
        setDataF();
        setCart();
    };

    return (<div className="container mt-5">
    <hr></hr> 
    <h1>Payment Summary:</h1>
    <h3>Name: {dataF.fullName}</h3>
    <p><strong>Email: </strong>{dataF.email}</p>
    <p><strong>Credit Card:</strong>XXXXXXXXXXXX{String(dataF.creditCard).substring(12)}</p>
    <p><strong>Address</strong>{dataF.address}</p>
    {dataF.address2 && <p>{dataF.address2}</p>}
    <p>{dataF.city}, {dataF.state} {dataF.zip} </p>
    <button onClick={updateHooks} className="btn btn-secondary">Return</button>
    </div>);  
  };

  return (
    <div className="app">
      {currentView === 1 && (
        <div>
          <h1>Product Catalog</h1>
          <Product products={Products} onCheckout={handleCheckout} onAddToCart={handleAddToCart} />
        </div>
      )}
      {currentView === 2 && <Payment/>}
      {currentView === 3 && <Summary/>}
    </div>
  );
};

export default App;
