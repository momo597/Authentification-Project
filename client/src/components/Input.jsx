const Input = ({ placeholder, handleChange, handleBlur, value, name }) => {
  return (
    <input
      type={
        name === "password" || name === "confirmPassword" ? "password" : "text"
      }
      placeholder={placeholder}
      className=" bg-inputBg rounded-md drop-shadow-lg w-full sm:w-2/3 h-12 px-6 text-xl outline-none my-3"
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      name={name}
    />
  );
};

export default Input;
