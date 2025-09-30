import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import OptionItem from "./OptionItem";
import { useAsyncAutocomplete } from "@/hooks/useAsyncAutocomplete";
import { Item } from "@/types/item";

type Props = {
  value: Item | null;
  onChange: (val: Item | null) => void;
};

export default function AsyncAutocomplete({ value, onChange }: Props) {
  const { open, setOpen, setInputValue, options, loading, error, onScroll } =
    useAsyncAutocomplete();

  return (
    <Autocomplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      value={value}
      onChange={(_, val) => onChange(val)}
      filterOptions={(x) => x}
      ListboxProps={{
        onScroll,
        style: { maxHeight: 300, overflow: "auto" },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="انتخاب آیتم"
          placeholder="جستجو..."
          onChange={(e) => setInputValue(e.target.value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          helperText={error ? "خطا در اتصال به سرور" : ""}
        />
      )}
      noOptionsText={error ? "خطا در اتصال به سرور" : "هیچ نتیجه‌ای یافت نشد"}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          <OptionItem option={option} />
        </li>
      )}
    />
  );
}
