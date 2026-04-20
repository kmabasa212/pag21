import { useState, useEffect } from "react";
import type { Product, ProductResponse } from "../types/product";
import { useFetch } from "../hooks/useFetch";
import ProductSearch from "./ProductSearch";

export default function ProductList() {
  const { data, isLoading, error, retry } = useFetch<ProductResponse>("https://dummyjson.com/products?limit=10");
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (data) setLocalProducts(data.products);
  }, [data]);

  const addProduct = async () => {
    const response = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, price: 10, category: 'General' })
    });
    const addedProduct = await response.json();
    setLocalProducts([addedProduct, ...localProducts]);
    setNewTitle("");
    alert("Product Added!");
  };

  const updateProduct = async (id: number) => {
    await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: `${newTitle} (Updated)` })
    });
    setLocalProducts(localProducts.map(p => p.id === id ? { ...p, title: `${p.title} (Updated)` } : p));
    alert("Product Updated!");
  };

  const deleteProduct = async (id: number) => {
    await fetch(`https://dummyjson.com/products/${id}`, { method: "DELETE" });
    setLocalProducts((prev: Product[]) => prev.filter((p: Product) => p.id !== id));
    alert("Product Deleted Successfully");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return (<div><p>{error}</p><button onClick={retry}>Retry</button></div>);

  return (
    <div>
      <ProductSearch />
      
      <div style={{ marginBottom: "20px", border: "1px solid blue", padding: "10px" }}>
        <h3>Add New Product</h3>
        <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Enter product title" />
        <button onClick={addProduct} disabled={!newTitle}>Add Product</button>
      </div>

      <h2>Products</h2>
      {localProducts.map((p: Product) => (
        <div key={p.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px", display: "flex", gap: "15px" }}>
          <img 
            src={p.thumbnail} 
            alt={p.title} 
            style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "4px" }} 
          />
          <div>
            <h3>{p.title}</h3>
            <p>${p.price}</p>
            <button onClick={() => updateProduct(p.id)}>Update</button>
            <button onClick={() => deleteProduct(p.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}