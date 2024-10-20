import Select from "react-select";

function SelectComponent({ placeholder, options, value, onChange }) {
  const customStyle = {
    control: (provided) => ({
      ...provided,
      width: "145px",
      borderRadius: "5px",
      boxShadow: "none",
      textAlign: "left",
      fontSize: "14px",
      height: "47px",
    }),
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      color: state.isSelected ? "black" : state.isFocused ? "black" : "grey",
      backgroundColor: state.isSelected ? "#fff8f6" : state.isFocused ? "#fff8f6" : "white",
      padding: "10px",
      margin: "5px 0",
    }),
  };

  return <Select placeholder={placeholder} options={options} value={options.find((option) => option.value === value)} onChange={onChange} styles={customStyle} />;
}

export default SelectComponent;
