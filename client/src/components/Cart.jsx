import React from 'react';
import Stepper from './Stepper';
import '../css/Cart.css';

function Cart() {
  return (
    <>
      <div className="Cart">
        <div className="Cart-content">
            <div className="Cart-content-header">
                <h1>Cart</h1>
                <div className="Process"><Stepper/></div>
            </div>
            <div className="Cart-content-items">
                <h1>Your Cart is Empty</h1>
            </div>
        </div>
      </div>
    </>
  )
}

export default Cart
