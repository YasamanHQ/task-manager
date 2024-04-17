function SelectStatus({ id, value, onChange }) {
  return (
    <select
      id={id}
      className="input dark:valid:bg-dark-bg-color text-sm"
      value={value}
      onChange={onChange}
    >
      <option className="dark:bg-[--dark-bg-app-color]" value="Todo">
        Todo
      </option>
      <option className="dark:bg-dark-border-color" value="Doing">
        Doing
      </option>
      <option className="dark:bg-dark-border-color" value="Done">
        Done
      </option>
    </select>
  );
}

export default SelectStatus;
