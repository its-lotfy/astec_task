import { Box, Typography } from "@mui/material";
import { Item } from "@/types/item";

export default function OptionItem({ option }: { option: Item }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="body2">{option.name}</Typography>
      {option.description && (
        <Typography variant="caption">{option.description}</Typography>
      )}
    </Box>
  );
}
