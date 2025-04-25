import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    toast.success("Payment sent successfully!");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div
        className="card p-4 shadow-lg rounded-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h2
          className="text-center mb-4"
          style={{ color: "rgb(255, 104, 108)" }}
        >
          Cartsy Payment
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Cardholder Name */}
          <div className="mb-3">
            <label className="form-label">Cardholder Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="John Doe"
              {...register("name", { required: "Name is required" })}
              style={{ borderColor: "rgb(255, 104, 108)" }}
            />
            {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )}
          </div>

          {/* Card Number */}
          <div className="mb-3">
            <label className="form-label">Card Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="1234567890123456"
              maxLength={16}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "").slice(0, 16);
              }}
              {...register("cardNumber", {
                required: "Card number is required",
                pattern: {
                  value: /^\d{16}$/,
                  message: "Card number must be 16 digits",
                },
              })}
              style={{ borderColor: "rgb(255, 104, 108)" }}
            />
            {errors.cardNumber && (
              <small className="text-danger">{errors.cardNumber.message}</small>
            )}
          </div>

          {/* Expiry and CVV */}
          <div className="row">
            <div className="col-6 mb-3">
              <label className="form-label">Expiry</label>
              <input
                type="text"
                className="form-control"
                placeholder="MM/YY"
                maxLength={5}
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^\d/]/g, "")
                    .slice(0, 5);
                }}
                {...register("expiry", {
                  required: "Expiry is required",
                  pattern: {
                    value: /^\d{2}\/\d{2}$/,
                    message: "Format must be MM/YY",
                  },
                })}
                style={{ borderColor: "rgb(255, 104, 108)" }}
              />
              {errors.expiry && (
                <small className="text-danger">{errors.expiry.message}</small>
              )}
            </div>

            <div className="col-6 mb-3">
              <label className="form-label">CVV</label>
              <input
                type="password"
                className="form-control"
                placeholder="123"
                maxLength={4}
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 4);
                }}
                {...register("cvv", {
                  required: "CVV is required",
                  pattern: {
                    value: /^\d{3,4}$/,
                    message: "CVV must be 3 or 4 digits",
                  },
                })}
                style={{ borderColor: "rgb(255, 104, 108)" }}
              />
              {errors.cvv && (
                <small className="text-danger">{errors.cvv.message}</small>
              )}
            </div>
          </div>

          {/* Pay Button */}
          <button
            type="submit"
            className="btn w-100 text-white"
            style={{ backgroundColor: "rgb(255, 104, 108)" }}
          >
            Pay ₹{userData?.totalPrice || userData}
          </button>
        </form>

        <p className="text-center text-muted mt-3 small">
          This is a dummy payment page. No real transaction will occur.
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;
