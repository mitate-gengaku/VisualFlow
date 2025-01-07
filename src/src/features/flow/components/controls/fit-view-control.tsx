import { ControlButton, useReactFlow } from "@xyflow/react";
import { MaximizeIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const FitViewControl = () => {
  const { fitView } = useReactFlow();

  const onFitViewHandler = () => {
    fitView({
      duration: 1000,
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ControlButton onClick={() => onFitViewHandler()}>
          <MaximizeIcon />
        </ControlButton>
      </TooltipTrigger>
      <TooltipContent>画面幅に合わせる</TooltipContent>
    </Tooltip>
  );
};
