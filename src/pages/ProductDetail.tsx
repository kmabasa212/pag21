import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import type { Product } from "../types/product";

export function ProductDetail() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useFetch<Product>(`https://dummyjson.com/products/${id}`);

  if (isLoading) return <p>Loading product details...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <img src={product.thumbnail} alt={product.title} style={{ width: "300px", borderRadius: "12px", marginBottom: "20px" }} />
      <h1>{product.title}</h1>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}