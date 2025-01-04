import { Controls } from "@xyflow/react"
import { ZoomInControl } from "./zoom-in-control"
import { ZoomOutControl } from "./zoom-out-control"
import { FitViewControl } from "./fit-view-control"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/utils/cn"
import { SaveNodeControl } from "./save-node-control"
import { DownloadControl } from "@/features/download/components/download-control"

export const ControlPanel = () => {
  return (
    <Controls
      showZoom={false}
      showFitView={false}
      showInteractive={false}
      >
      <TooltipProvider>
        <div
          className={cn(
            "[&>button]:bg-white [&>button]:outline-none [&>button]:ring-0 [&>button]:border [&>button]:size-7 [&>button:hover]:bg-slate-100 [&>button]:transition-all",
            "[&>button:not(:last-child)]:border-b-0"
          )}
          >
          <ZoomInControl />
          <ZoomOutControl />
          <FitViewControl />
          <SaveNodeControl />
          <DownloadControl />
        </div>
      </TooltipProvider>
    </Controls>
  )
}