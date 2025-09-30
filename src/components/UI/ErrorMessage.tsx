import { Alert } from "@mui/material";

export default function ErrorMessage({ message }: { message: string }) {
  return <Alert severity="error">{message}</Alert>;
}
