import { ControlButton, useReactFlow } from "@xyflow/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { MaximizeIcon } from "lucide-react";

export const FitViewControl = () => {
  const {
    fitView
  } = useReactFlow();

  const onFitViewHandler = () => {
    fitView()
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <ControlButton
          onClick={() => onFitViewHandler()}
        >
          <MaximizeIcon />
        </ControlButton>
      </TooltipTrigger>
      <TooltipContent>
        画面幅に合わせる
      </TooltipContent>
    </Tooltip>
  )
}