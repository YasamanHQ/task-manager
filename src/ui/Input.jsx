function Input({
  id,
  type = "text",
  className = "input",
  placeholder,
  value,
  onChange,
}) {
  return (
    // {errors.title && (
    //   <p className="text-sm tracking-wide text-red-color">
    //     Field is empty!
    //   </p>
    // )}
    <>
      {className === "input" ? (
        <input
          id={id}
          type={type}
          className={className}
          placeholder={placeholder}
          // {...register("title", {
          //   required: true,
          // })}
          value={value}
          onChange={onChange}
        />
      ) : (
        <textarea
          id={id}
          type={type}
          className={className}
          placeholder={placeholder}
          // {...register("title", {
          //   required: true,
          // })}
          value={value}
          onChange={onChange}
        />
      )}
    </>
  );
}

export default Input;
