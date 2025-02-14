import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

import { ScrollArea } from "@/components/ui/scroll-area";
import { CopyButton } from "@/features/flow/components/export/copy-button";
import { useExport } from "@/features/flow/hooks/use-export";

export const CodeBlock = () => {
  const { code } = useExport();

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
