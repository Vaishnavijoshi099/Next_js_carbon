'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Tile } from '@carbon/react';
import './productDetails.scss';
import '/app/navbar.scss';

interface Product {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  stock: number;
  brand: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`https://dummyjson.com/products/${id}`);
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  return (
    <div className="productDetailContainer">
      {product ? (
        <Tile className="productDetailTile">
          <div className="productImageContainer">
            <img src={product.thumbnail} alt={product.title} />
          </div>
          <div className="productDetails">
            <h2 className="productTitle">{product.title}</h2>
            <p className="productDescription">{product.description}</p>
            <p className="productPrice">Price: ${product.price}</p>
            <p className="productCategory">Category: {product.category}</p>
            <p className="productRating">Rating: {product.rating} ⭐</p>
            <p className="productStock">Stock: {product.stock} left</p>
            <p className="productBrand">Brand: {product.brand}</p>
            {/* <div className="buttonContainer">
              <button className="addToCart">Add to Cart</button>
              <button className="buyNow">Buy Now</button>
            </div> */}
          </div>
        </Tile>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
}
