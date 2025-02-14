import { CheckIcon, CopyIcon } from "lucide-react";
import { RefAttributes } from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import { useExport } from "@/features/flow/hooks/use-export";

interface Props extends ButtonProps, RefAttributes<HTMLButtonElement> {}

export const CopyButton = (props: Props) => {
  const { isSuccessCopy, onCopyToClipboard } = useExport();

  return (
    <Button {...props} onClick={() => onCopyToClipboard()}>
      {isSuccessCopy ? <CheckIcon className="text-green-500" /> : <CopyIcon />}
    </Button>
  );
};
