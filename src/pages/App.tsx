import { useState } from "react";
import AsyncAutocomplete from "../components/UI/AsyncAutocomplete.tsx";
import type { Item } from "../types/item.ts";

function App() {
  const [selected, setSelected] = useState<Item | null>(null);

  return (
    <main style={{ padding: 20 }}>
      <h1>تست Autocomplete</h1>
      <AsyncAutocomplete value={selected} onChange={setSelected} />
      {selected && <p>انتخاب شده: {selected.lastName}</p>}
    </main>
  );
}
export default App;
