"use client";

import { ControlButton } from "@xyflow/react";
import { UploadIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useExportDialog } from "@/features/flow/hooks/use-export-dialog";

export const DownloadControl = () => {
  const { onOpenHandler } = useExportDialog();

  return (
    <Tooltip>
      <TooltipTrigger onClick={() => onOpenHandler()} asChild>
        <ControlButton>
          <UploadIcon className="dark:!fill-slate-950 !fill-white stroke-2" />
        </ControlButton>
      </TooltipTrigger>
      <TooltipContent>Export</TooltipContent>
    </Tooltip>
  );
};
