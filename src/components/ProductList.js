function ProductList({ products, isPending }) {
  return (
    <ul>
      {products.map((product) => (
        <li>{product}</li>
      ))}
      {products.length === 0 && !isPending && (
        <div class="info">No product match</div>
      )}
    </ul>
  );
}

export default ProductList;
