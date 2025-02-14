"use client";

import { getConnectedEdges } from "@xyflow/react";
import { useAtom, useAtomValue } from "jotai";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

import { edgesAtom } from "@/features/flow/store/edge";
import { nodesAtom } from "@/features/flow/store/node";
import { workflowCodeAtom } from "@/features/flow/store/workflow-code";
import { TransformDataClass } from "@/features/flow/utils/transform-data";

export const useExport = () => {
  const [isSuccessCopy, setSuccessCopy] = useState<boolean>(false);
  const nodes = useAtomValue(nodesAtom);
  const edges = useAtomValue(edgesAtom);
  const [workflowCode, setWorkflowCode] = useAtom(workflowCodeAtom);

  const onDownload = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const connectedEdges = getConnectedEdges(nodes, edges);
    const TransformData = new TransformDataClass(nodes, connectedEdges);

    const content = TransformData.generateYaml();
    const fileName = "test.yml";

    setWorkflowCode(content);

    const blob = new Blob([content]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
  };

  const onCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(workflowCode);
      setSuccessCopy(true);
    } catch (e) {
      if (e instanceof Error) {
        toast.error("Failed to copy");
        return;
      }
      return;
    }
  };

  useEffect(() => {
    const connectedEdges = getConnectedEdges(nodes, edges);

    if (!connectedEdges.length) {
      setWorkflowCode("No connected nodes found");
      return;
    }

    const TransformData = new TransformDataClass(nodes, connectedEdges);

    const content = TransformData.generateYaml();

    setWorkflowCode(content);
  }, [nodes, edges, setWorkflowCode]);

  useEffect(() => {
    if (!isSuccessCopy) return;
    setTimeout(() => {
      setSuccessCopy(false);
    }, 3000);
  }, [isSuccessCopy]);

  return {
    isSuccessCopy,
    code: workflowCode,
    onDownload,
    onCopyToClipboard,
  };
};
