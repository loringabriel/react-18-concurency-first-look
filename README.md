# React v18 concurency-first-look

Simple example inspired by @mschwarzmueller with the new `useTransition` hook.

It uses the new `concurrent rendering` which allows the user to continue interacting with the page while rendering the update. [View docs](https://reactjs.org/docs/hooks-reference.html#usetransition)

```javascript
function App() {
  const [isPending, startTransition] = useTransition();

  const [filterTerm, setFilterTerm] = useState("");
  const [data, setData] = useState(filterProducts());

  function updateFilterHandler(value) {
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
```

![CleanShot 2022-04-05 at 08 44 59](https://user-images.githubusercontent.com/28633412/161687089-d2afb522-51b7-483f-95e4-16ac6a58659e.gif)
