import { Routes, Route } from "react-router-dom";
import { Products } from "./pages/Products";
import { SearchResults } from "./pages/SearchResults";
import { ProductDetail } from "./pages/ProductDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/search" element={<SearchResults />} />
    </Routes>
  );
}

export default App;