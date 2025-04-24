import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import { Container, Row, Col, Image, ListGroup, Card } from "react-bootstrap";
import Loader from "./Loader";
import { useCart } from "../context/CartContext";

const SearchViewProduct = () => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  const { cart, addToCart } = useCart();
  const location = useLocation();

  const userData = location.state;
  useEffect(() => {
    setProduct(userData.item);

    setSelectedImage(userData?.item.images[0]);

    document.title = userData.item.title;
  }, [userData.item.id]);

  if (!product)
    return (
      <div className="min-vh-100 min-vw-100 d-flex align-items-center justify-content-center">
        <Loader />
      </div>
    );

  return (
    <div className="mb-5">
      <Header />
      <Container className="mt-4">
        <Row className="mb-4">
          {/* Product Images */}
          <Col md={5}>
            <Image
              src={selectedImage}
              fluid
              rounded
              className="mb-3 w-100 d-flex justify-content-center"
              style={{ height: "400px", objectFit: "contain" }}
            />
            <div className="d-flex justify-content-start gap-2">
              {product.images.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  onClick={() => setSelectedImage(img)}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    border:
                      selectedImage === img
                        ? "2px solid red"
                        : "1px solid #ccc",
                    cursor: "pointer",
                  }}
                  rounded
                />
              ))}
            </div>
          </Col>

          {/* Product Info */}
          <Col md={5}>
            <h2 style={{ color: " rgb(255, 104, 108)" }}>{product.title}</h2>
            <p>{product.description}</p>
            <h4>
              ₹{Math.ceil(product.price)}{" "}
              <span className="text-success">
                ({product.discountPercentage}% off)
              </span>
            </h4>
            <p className="mb-1">
              <strong>Category:</strong> {product.category}
            </p>
            <p className="mb-1">
              <strong>Brand:</strong> {product.brand}
            </p>
            <p className="mb-1">
              <strong>Rating:</strong> ⭐ {product.rating}
            </p>
            <p className="mb-1">
              <strong>Stock:</strong> {product.stock}
            </p>
            <p className="mb-1">
              <strong>SKU:</strong> {product.sku}
            </p>
            <p className="mb-1">
              <strong>Shipping:</strong> {product.shippingInformation}
            </p>
            <p className="mb-1">
              <strong>Return Policy:</strong> {product.returnPolicy}
            </p>
            <button
              className="mt-2 btn btn-outline-primary"
              onClick={() => {
                addToCart(
                  product.id,
                  product.title,
                  product.price,
                  product.discountPercentage,
                  product.thumbnail,
                  product.stock
                );
              }}
            >
              Add to cart
            </button>
          </Col>

          {/* QR Code */}
          <Col
            md={2}
            className="text-center v-100 d-flex align-items-center justify-content-center"
          >
            <Image src={product.meta.qrCode} fluid />
          </Col>
        </Row>

        {/* Reviews Section */}
        <Row>
          <Col>
            <h4 className="mb-3">Customer Reviews</h4>
            <ListGroup>
              {product.reviews.map((review, i) => (
                <ListGroup.Item key={i}>
                  <strong>{review.reviewerName}</strong> — ⭐ {review.rating}
                  <p className="mb-1">{review.comment}</p>
                  <small className="text-muted">
                    {new Date(review.date).toLocaleDateString()}
                  </small>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchViewProduct;
