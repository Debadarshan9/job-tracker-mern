import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const TextFieldComponent = ({
  name,
  control,
  label,
  placeholder,
  fullWidth = true,
  required,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required || false }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={label}
          placeholder={placeholder}
          fullWidth={fullWidth}
          required={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};

export default TextFieldComponent;
