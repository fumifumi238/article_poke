import Autocomplete from "@mui/material/Autocomplete";
import { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

type FormSetting = {
  label: string;
  options: string[];
  disabled?: boolean;
  defaultValue?: string;
};
const AutoCompleteInput = ({
  label,
  options,
  disabled,
  defaultValue,
}: FormSetting) => {
  const filterOptions = createFilterOptions({
    limit: label !== "テラスタイプ" ? 3 : 18,
    trim: true,
  });
  return (
    <Autocomplete
      disablePortal
      disabled={disabled}
      clearOnBlur
      id="combo-box-demo"
      filterOptions={filterOptions}
      sx={{ padding: 0 }}
      options={options}
      autoHighlight={true}
      disableClearable={true}
      defaultValue={defaultValue}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="filled" />
      )}
    />
  );
};

export default AutoCompleteInput;
