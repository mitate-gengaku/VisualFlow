import { ControlButton, useReactFlow } from "@xyflow/react";
import { PlusIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ZoomInControl = () => {
  const { zoomIn } = useReactFlow();

  const onZoomInHander = () => {
    zoomIn({
      duration: 1000,
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ControlButton onClick={() => onZoomInHander()}>
          <PlusIcon />
        </ControlButton>
      </TooltipTrigger>
      <TooltipContent>拡大</TooltipContent>
    </Tooltip>
  );
};
