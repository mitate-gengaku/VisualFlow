"use client";

import { ControlButton } from "@xyflow/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { SaveIcon, UploadIcon } from "lucide-react";
import { useDataStorage } from "@/features/flow/hooks/use-data-storage"
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DownloadForm } from "./download-form";

export const DownloadControl = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen} >
      <Tooltip>
        <TooltipTrigger
          onClick={() => setOpen((open) => !open)}
          asChild
        >
          <ControlButton>
            <UploadIcon
              className='!fill-white stroke-2'
            />
          </ControlButton>
        </TooltipTrigger>
        <TooltipContent>
          エクスポート
        </TooltipContent>
      </Tooltip>
      <DialogContent className='font-noto-sans-jp flex flex-col gap-8'>
        <DialogHeader>
          <DialogTitle>Workflowのダウンロード</DialogTitle>
          <DialogDescription>YAMLファイルをダウンロードします</DialogDescription>
        </DialogHeader>
        <DownloadForm />
      </DialogContent>
    </Dialog>
  )
}