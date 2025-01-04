"use client";

import { ControlButton } from "@xyflow/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { SaveIcon, UploadIcon } from "lucide-react";
import { useDataStorage } from "@/features/flow/hooks/use-data-storage"
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DownloadForm } from "./download-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAtomValue } from "jotai";
import { workflowCodeAtom } from "@/features/flow/components/react-flow";
import { CodeBlock } from "./code-block";
import { useDownload } from "../hooks/use-download";

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
      <DialogContent className='font-noto-sans-jp flex flex-col'>
        <DialogHeader>
          <DialogTitle>Workflowのダウンロード</DialogTitle>
          <DialogDescription>ダウンロードする方法を選んでください</DialogDescription>
        </DialogHeader>
        <Tabs
          defaultValue="file"
          className="flex flex-col gap-4"
          >
          <TabsList className="justify-start w-fit">
            <TabsTrigger value="file">ファイル</TabsTrigger>
            <TabsTrigger value="code">コード</TabsTrigger>
          </TabsList>
          <TabsContent value="file">
            <DownloadForm />
          </TabsContent>
          <TabsContent value="code">
            <CodeBlock />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}