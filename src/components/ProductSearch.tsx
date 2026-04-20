import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Product, ProductResponse } from "../types/product";

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        return;
      }
      const res = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=5`);
      const data: ProductResponse = await res.json();
      setSuggestions(data.products);
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setSuggestions([]);
    }
  };

  return (
    <div style={{ position: "relative", marginBottom: "20px" }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        style={{ padding: "8px", width: "200px" }}
      />
      <button onClick={handleSearch} disabled={!query.trim()} style={{ marginLeft: "8px" }}>
        Search
      </button>

      {query.length > 0 && query.trim().length < 2 && (
        <p style={{ color: "red", fontSize: "12px" }}>Enter at least 2 characters</p>
      )}

      {suggestions.length > 0 && (
        <ul style={{
          position: "absolute",
          background: "white",
          border: "1px solid #ccc",
          listStyle: "none",
          padding: "10px",
          width: "200px",
          zIndex: 10
        }}>
          {suggestions.map((p) => (
            <li 
              key={p.id} 
              onClick={() => navigate(`/products/${p.id}`)}
              style={{ cursor: "pointer", padding: "5px 0", borderBottom: "1px solid #eee" }}
            >
              {p.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}