import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import { CopyButton } from "./copy-button";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useDownload } from "@/features/flow/hooks/use-download";

export const CodeBlock = () => {
  const { code } = useDownload();

  return (
    <div className="relative">
      <ScrollArea className="h-80">
        <CopyButton
          variant={"ghost"}
          size={"icon"}
          className="size-6 absolute right-3 top-3 hover:bg-transparent text-white hover:text-gray-400"
        />
        <SyntaxHighlighter
          language="yaml"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
          }}
        >
          {code}
        </SyntaxHighlighter>
      </ScrollArea>
    </div>
  );
};
