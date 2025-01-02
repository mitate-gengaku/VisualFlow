import { ControlButton, useReactFlow } from "@xyflow/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { PlusIcon } from "lucide-react";

export const ZoomInControl = () => {
  const {
    zoomIn
  } = useReactFlow();

  const onZoomInHander = () => {
    zoomIn();
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ControlButton
          onClick={() => onZoomInHander()}
        >
          <PlusIcon />
        </ControlButton>
      </TooltipTrigger>
      <TooltipContent>
        拡大
      </TooltipContent>
    </Tooltip>
  )
}