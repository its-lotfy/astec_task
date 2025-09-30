import { Box, Typography } from "@mui/material";
import type { Item } from "../../types/item.ts";

export default function OptionItem({ option }: { option: Item }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="body2">{option.lastName}</Typography>
    </Box>
  );
}
