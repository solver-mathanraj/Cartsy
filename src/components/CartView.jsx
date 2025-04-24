import React from "react";
import { useCart } from "../context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import Header from "./Header";

const CartView = () => {
  const { cart, removeFromCart, decrementFromCart, incrementFromCart } =
    useCart();

  const totalItems = cart.reduce((total, item) => total + item.count, 0);
  const totalPrice = cart.reduce(
    (total, item) => total + Math.ceil(item.price) * item.count,
    0
  );

  return (
    <div className="container py-4">
      <Header />
      <h2 className="mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info text-center">
          Your cart is empty 🛒
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="row g-0 align-items-center">
                <div className="col-md-3 text-center">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="img-fluid p-2"
                    style={{ maxHeight: "200px", objectFit: "contain" }}
                  />
                </div>
                <div className="col-md-9">
                  <div className="card-body">
                    <h5 className="card-title mb-1">{item.title}</h5>
                    <p className="card-text mb-1 text-muted">
                      Discount: {item.discountPercentage}% | Stock: {item.stock}
                    </p>
                    <p className="card-text text-danger fw-bold">
                      ₹{Math.ceil(item.price)}
                    </p>
                    <div className="d-flex align-items-center gap-2 mt-2">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => decrementFromCart(item.id)}
                      >
                        <Minus size={16} />
                      </button>
                      <span>{item.count}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => incrementFromCart(item.id)}
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm ms-auto"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Cart Summary</h5>
              <p className="card-text mb-1">
                Total Items: <strong>{totalItems}</strong>
              </p>
              <p className="card-text mb-3">
                Total Price:{" "}
                <strong className="text-success">
                  ₹{totalPrice.toFixed(2)}
                </strong>
              </p>
              <button className="btn btn-primary w-100">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartView;
