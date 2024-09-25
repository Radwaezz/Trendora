


import './Counter.css'; 

function Counter({ quantity, setQuantity }) {
  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="counter">
      <button className="decrement" onClick={decrement}>-</button>
      <input
        type="number"
        value={quantity}
        min="1"
        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
      />
      <button className="increment" onClick={increment}>+</button>
    </div>
  );
}

export default Counter;
