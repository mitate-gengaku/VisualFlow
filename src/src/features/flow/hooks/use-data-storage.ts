import { useReactFlow } from "@xyflow/react";
import { useAtom, useSetAtom } from "jotai";
import { useCallback } from "react";
import { toast } from "sonner";

import {
  edgesAtom,
  nodesAtom,
  saveDataAtom,
} from "@/features/flow/components/react-flow";
import { FlowData } from "@/features/flow/types/flow-data";

export const useDataStorage = () => {
  const setNodes = useSetAtom(nodesAtom);
  const setEdges = useSetAtom(edgesAtom);
  const [saveData, setSaveData] = useAtom(saveDataAtom);
  const { toObject, setViewport } = useReactFlow();

  const onSave = useCallback(() => {
    const data = toObject();

    if (saveData) {
      setSaveData({
        ...data,
        created_at: saveData.created_at,
        updated_at: new Date().toISOString(),
      });
    } else {
      setSaveData({
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
    toast.success("保存しました");
  }, [saveData]);

  const onRestore = useCallback(() => {
    if (!saveData) {
      return;
    }

    const { nodes, edges, viewport } = saveData;

    setNodes(nodes);
    setEdges(edges);
    setViewport(viewport);

    toast.success("データを復元しました");
  }, [saveData]);

  const onRestoreFromParams = (data: FlowData | undefined) => {
    if (!data) {
      return;
    }

    const { nodes, edges, viewport } = data;

    setNodes(nodes);
    setEdges(edges);
    setViewport(viewport);

    toast.success("データを復元しました");
  };

  return {
    onSave,
    onRestore,
    onRestoreFromParams,
  };
};
