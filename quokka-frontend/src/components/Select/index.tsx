import {
  Select as MuiSelect,
  FormControl,
  InputLabel,
  MenuItem,
  SelectProps,
} from "@mui/material";
import React from "react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
} & SelectProps;

export const Select: React.FC<Props> = (props) => {
  const { value, onChange, options, name, label } = props;
  return (
    <FormControl fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <MuiSelect
        labelId={`${name}-label`}
        id={`${name}-select`}
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};
