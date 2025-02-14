import { Controls } from "@xyflow/react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { DownloadControl } from "@/features/flow/components/controls/download-control";
import { FitViewControl } from "@/features/flow/components/controls/fit-view-control";
import { SaveNodeControl } from "@/features/flow/components/controls/save-node-control";
import { ZoomInControl } from "@/features/flow/components/controls/zoom-in-control";
import { ZoomLevelControl } from "@/features/flow/components/controls/zoom-level-control";
import { ZoomOutControl } from "@/features/flow/components/controls/zoom-out-control";
import { cn } from "@/lib/utils";

export const ControlPanel = () => {
  return (
    <Controls showZoom={false} showFitView={false} showInteractive={false}>
      <TooltipProvider>
        <div
          className={cn(
            "[&>button]:bg-white [&>button]:outline-none [&>button]:ring-0 [&>button]:border [&>button]:size-7 [&>button:hover]:bg-slate-100 [&>button]:transition-all",
            "[&>button:not(:last-child)]:border-b-0",
          )}
        >
          <ZoomInControl />
          <ZoomLevelControl />
          <ZoomOutControl />
          <FitViewControl />
          <SaveNodeControl />
          <DownloadControl />
        </div>
      </TooltipProvider>
    </Controls>
  );
};
