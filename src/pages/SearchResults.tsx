import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { Product, ProductResponse } from "../types/product";

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }

        const data: ProductResponse = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  if (loading) return <p>Searching for products...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Showing results for: {query}</h2>
      {products.length === 0 ? (
        <p>No products found for "{query}"</p>
      ) : (
        products.map((product) => (
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
        ))
      )}
    </div>
  );
}