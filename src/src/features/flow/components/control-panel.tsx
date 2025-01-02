import { Controls } from "@xyflow/react"
import { ZoomInControl } from "./zoom-in-control"
import { ZoomOutControl } from "./zoom-out-control"
import { FitViewControl } from "./fit-view-control"
import { TooltipProvider } from "@/components/ui/tooltip"

export const ControlPanel = () => {
  return (
    <Controls
      showZoom={false}
      showFitView={false}
      showInteractive={false}
      >
      <TooltipProvider>
        <div>
          <ZoomInControl />
          <ZoomOutControl />
          <FitViewControl />
        </div>
      </TooltipProvider>
    </Controls>
  )
}