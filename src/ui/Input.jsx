function Input({
  id,
  type = "text",
  className = "input",
  placeholder,
  value,
  onChange,
  register,
}) {
  return (
    <>
      {className === "input" ? (
        <input
          id={id}
          type={type}
          className={className}
          placeholder={placeholder}
          {...register(`${id}`, {
            required: true,
          })}
          value={value}
          onChange={onChange}
        />
      ) : (
        <textarea
          id={id}
          type={type}
          className={className}
          placeholder={placeholder}
          {...register(`${id}`, {
            required: true,
          })}
          value={value}
          onChange={onChange}
        />
      )}
    </>
  );
}

export default Input;
