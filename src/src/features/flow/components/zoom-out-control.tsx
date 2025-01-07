import { ControlButton, useReactFlow } from "@xyflow/react";
import { MinusIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ZoomOutControl = () => {
  const { zoomOut } = useReactFlow();

  const onZoomOutHandler = () => {
    zoomOut({
      duration: 1000,
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ControlButton onClick={() => onZoomOutHandler()}>
          <MinusIcon />
        </ControlButton>
      </TooltipTrigger>
      <TooltipContent>縮小</TooltipContent>
    </Tooltip>
  );
};
