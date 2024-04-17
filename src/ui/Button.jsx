function Button({ type, onClick, className, children }) {
  return (
    <button type={type} onClick={onClick} className={`button ${className}`}>
      {children}
    </button>
  );
}

export default Button;
