import { useState, useTransition } from "react";

import { generateProducts } from "./data";
import ProductList from "./components/ProductList";

function filterProducts(filterTerm) {
  if (!filterTerm) {
    return generateProducts();
  }
  return generateProducts().filter((product) => product.includes(filterTerm));
}

function App() {
  const [isPending, startTransition] = useTransition();
  const [concurentMode, setConcurentMode] = useState(true);

  const [filterTerm, setFilterTerm] = useState("");
  const [data, setData] = useState(filterProducts());

  function updateFilterHandler(e) {
    const { value } = e.target;
    if (concurentMode) {
      startTransition(() => {
        setData(filterProducts(value)); //expensive update
      });
    } else {
      setData(filterProducts(value)); //expensive update
    }
    setFilterTerm(value); //urgent update
  }

  return (
    <div id="app">
      <ConcurrentModeToggle
        concurentMode={concurentMode}
        setConcurentMode={setConcurentMode}
      />

      <input
        value={filterTerm}
        className="search"
        type="text"
        onChange={updateFilterHandler}
      />
      <button onClick={updateFilterHandler}>Reset</button>

      <div className="label">{isPending && "Updating..."}</div>

      <ProductList products={data} isPending={isPending} />
    </div>
  );
}

function ConcurrentModeToggle({ concurentMode, setConcurentMode }) {
  return (
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
  );
}

export default App;
