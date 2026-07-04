"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/shared/components/ui/combobox";

interface SearchableSelectProps<T> {
  items: T[];
  value: T | null;
  onChange: (value: T | null) => void;
  placeholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  itemKey: (item: T) => string | number;
  itemLabel: (item: T) => string;
}

export default function SearchableSelect<T>({
  items,
  value,
  onChange,
  placeholder = "Select...",
  emptyMessage = "No results found.",
  disabled = false,
  itemKey,
  itemLabel,
}: SearchableSelectProps<T>) {
  return (
    <Combobox
      items={items}
      value={value}
      onValueChange={onChange}
      itemToStringLabel={itemLabel}
      itemToStringValue={itemLabel}
      isItemEqualToValue={(a, b) => itemKey(a) === itemKey(b)}
    >
      <ComboboxInput placeholder={placeholder} disabled={disabled} />
      <ComboboxContent>
        <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={itemKey(item)} value={item}>
              {itemLabel(item)}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
