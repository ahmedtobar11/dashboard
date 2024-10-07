import Select from "react-select";

function SelectComponent(props) {
  const { placeholder, options, onChange } = props;

  const customStyle = {
    control: (provided) => ({
      ...provided,
      width: "200px",
      borderRadius: "5px",
      boxShadow: "none",
      textAlign: "left",
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      color: state.isSelected ? "black" : state.isFocused ? "black" : "grey",
      backgroundColor: state.isSelected
        ? "#fff8f6"
        : state.isFocused
        ? "#fff8f6"
        : "white",
      padding: "10px",
      margin: "5px 0",
    }),
  };

  return (
    <Select
      options={options}
      styles={customStyle}
      onChange={onChange}
      placeholder={placeholder}
      // value={value}
    />
  );
}

export default SelectComponent;
