import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

const SelectFieldComponent = ({
  name,
  control,
  label,
  options,
  placeholder,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select {...field} label={label}>
            <MenuItem disabled value="">
              {placeholder}
            </MenuItem>
            {options.map((options) => (
              <MenuItem value={options.value}>{options.viewValue}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default SelectFieldComponent;
