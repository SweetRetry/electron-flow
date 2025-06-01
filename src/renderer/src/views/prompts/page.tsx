import { Button } from "@renderer/components/ui/button";
import { Input } from "@renderer/components/ui/input";
import { getPrompts } from "@renderer/lib/prompt";
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

const PromptsPage = () => {
  const { t, i18n } = useTranslation();

  const lang = i18n.language;

  const [type, setType] = useState<string>("text");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const types = useMemo(
    () => [
      {
        type: "text",
        title: "Text creation",
        options: getPrompts(lang, "text"),
      },
      {
        type: "image",
        title: "Image creation",
        options: getPrompts(lang, "image"),
      },
      {
        type: "video",
        title: "Video creation",
        options: getPrompts(lang, "video"),
      },
    ],
    [lang]
  );

  return (
    <section className="relative p-4">
      <h2 className="mb-4 text-2xl font-bold">{t("sidebar.prompts")}</h2>
      <header className="flex items-center gap-2">
        <nav className="flex-1">
          <ul className="flex items-center gap-2">
            {types.map((item) => (
              <li key={item.type}>
                <Button
                  variant={type === item.type ? "default" : "ghost"}
                  className="cursor-pointer"
                  onClick={() => setType(item.type)}
                >
                  {item.title}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Input placeholder="Search..." className="w-48" />
          <Button variant="secondary" className="ml-auto cursor-pointer">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add prompt
          </Button>
        </div>
      </header>

      <div className="relative -mx-2 mt-4 flex flex-wrap items-stretch">
        {types
          .find((item) => item.type === type)
          ?.options.map((item) => (
            <div
              key={item.id}
              className="basis-1/3 p-2"
              onClick={() => handleCopy(item.description)}
            >
              <div className="border-border hover:bg-secondary flex h-full cursor-pointer flex-col rounded-md border p-4 transition-colors">
                <div className="flex-1">
                  <h3 className="font-semibold">{item.style}</h3>
                  <p className="text-muted-foreground mt-4 text-sm">{item.description}</p>
                </div>

                <ul className="mt-4 flex flex-wrap gap-x-2">
                  {item.tags.map((tag) => (
                    <span
                      className="border-border bg-secondary text-secondary-foreground mt-4 w-fit rounded-md border p-1 text-xs"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default PromptsPage;
