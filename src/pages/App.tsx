import { useState } from "react";
import AsyncAutocomplete from "@/components/UI/AsyncAutocomplete";
import type { Item } from "@/types/item";

function App() {
  const [selected, setSelected] = useState<Item | null>(null);

  return (
    <main style={{ padding: 20 }}>
      <h1>تست Autocomplete</h1>
      <AsyncAutocomplete value={selected} onChange={setSelected} />
      {selected && <p>انتخاب شده: {selected.name}</p>}
    </main>
  );
}
export default App;
