import { ControlButton } from "@xyflow/react";
import { SaveIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDataStorage } from "@/features/flow/hooks/use-data-storage";

export const SaveNodeControl = () => {
  const { onSave } = useDataStorage();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ControlButton onClick={() => onSave()}>
          <SaveIcon className="!fill-white dark:!fill-slate-950" />
        </ControlButton>
      </TooltipTrigger>
      <TooltipContent>Save</TooltipContent>
    </Tooltip>
  );
};
