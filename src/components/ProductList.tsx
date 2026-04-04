import { useState, useEffect } from "react";
import type { Product, ProductResponse } from "../types/product"; 

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/products?limit=10");
        
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: ProductResponse = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid gray",
            marginBottom: 8,
            padding: 8,
          }}
        >
          <h3>{product.title}</h3>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
        </div>
      ))}
    </div>
  );
}