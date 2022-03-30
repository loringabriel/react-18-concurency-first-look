import { useState, useTransition } from "react";

import { generateProducts } from "./data";
import ProductList from "./components/ProductList";

const dummyProducts = generateProducts();

function filterProducts(filterTerm) {
  if (!filterTerm) {
    return dummyProducts;
  }
  return dummyProducts.filter((product) => product.includes(filterTerm));
}

function App() {
  const [isPending, startTransition] = useTransition();
  const [filterTerm, setFilterTerm] = useState("");
  const [concurentMode, setConcurentMode] = useState(true);

  const filteredProducts = filterProducts(filterTerm);

  function updateFilterHandler(event) {
    if (concurentMode) {
      startTransition(() => {
        setFilterTerm(event.target.value);
      });
    } else {
      setFilterTerm(event.target.value);
    }
  }

  return (
    <div id="app">
      <div className="container">
        <input
          checked={concurentMode}
          onChange={(e) => setConcurentMode(e.target.checked)}
          type="checkbox"
          id="concurent"
          name="concurent"
        />
        <label for="concurent">Concurent Updates</label>
      </div>

      <input className="search" type="text" onChange={updateFilterHandler} />

      <div className="label">{isPending && "Updating..."}</div>
      <ProductList products={filteredProducts} />
    </div>
  );
}

export default App;
