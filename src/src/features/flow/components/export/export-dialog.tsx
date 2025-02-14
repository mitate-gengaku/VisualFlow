"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/features/flow/components/export/code-block";
import { DownloadForm } from "@/features/flow/components/export/download-form";
import { useExportDialog } from "@/features/flow/hooks/use-export-dialog";

export const ExportDialog = () => {
  const { isOpen, onOpenChange } = useExportDialog();

  return (
    <Dialog open={isOpen} onOpenChange={(value) => onOpenChange(value)}>
      <DialogContent className=" flex flex-col">
        <DialogHeader>
          <DialogTitle>Download Workflow</DialogTitle>
          <DialogDescription>
            Please choose your download method
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="file" className="flex flex-col gap-4">
          <TabsList className="justify-start w-fit">
            <TabsTrigger value="file">File</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
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
  );
};
