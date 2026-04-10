import { Routes, Route } from "react-router-dom";
import { Products } from "./pages/Products";
import { SearchResults } from "./pages/SearchResults";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/products" element={<Products />} />
      <Route path="/search" element={<SearchResults />} />
    </Routes>
  );
}

export default App;