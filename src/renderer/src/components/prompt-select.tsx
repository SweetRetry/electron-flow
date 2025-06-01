import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@renderer/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@renderer/components/ui/popover";
import { getPrompts } from "@renderer/lib/prompt";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export const PromptSelect = ({
  type,
  children,
  onSelect,
}: {
  type: "text" | "image" | "video";
  children: React.ReactNode;
  onSelect: (prompt: string) => void;
}) => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const dataSource = useMemo(() => {
    return getPrompts(lang, type);
  }, [type]);

  const _dataSource = useMemo(() => {
    return dataSource.filter((item) =>
      `${item.style} ${item.description}`.toLowerCase().includes(value.toLowerCase())
    );
  }, [value, dataSource]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput
            placeholder="Search prompts..."
            value={value}
            onValueChange={(val) => setValue(val)}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {_dataSource.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.style}
                  onSelect={() => {
                    onSelect(item.description);
                    setOpen(false);
                  }}
                >
                  {item.style}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
