import { ControlButton, useReactFlow } from "@xyflow/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { MinusIcon } from "lucide-react";

export const ZoomOutControl = () => {
  const {
    zoomOut
  } = useReactFlow();

  const onZoomOutHandler = () => {
    zoomOut();
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ControlButton
          onClick={() => onZoomOutHandler()}
        >
          <MinusIcon />
        </ControlButton>
      </TooltipTrigger>
      <TooltipContent>
        縮小
      </TooltipContent>
    </Tooltip>
  )
}