import { useReactFlow } from "@xyflow/react";
import { useAtom, useSetAtom } from "jotai";
import { toast } from "sonner";

import { edgesAtom } from "@/features/flow/store/edge";
import { nodesAtom } from "@/features/flow/store/node";
import { saveDataAtom } from "@/features/flow/store/save-data";
import { FlowData } from "@/features/flow/types/flow-data";

export const useDataStorage = () => {
  const setNodes = useSetAtom(nodesAtom);
  const setEdges = useSetAtom(edgesAtom);
  const [saveData, setSaveData] = useAtom(saveDataAtom);
  const { toObject, setViewport } = useReactFlow();

  const onSave = () => {
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
  };

  const onRestore = () => {
    if (!saveData) {
      return;
    }

    const { nodes, edges, viewport } = saveData;

    setNodes(nodes);
    setEdges(edges);
    setViewport(viewport);

    toast.success("データを復元しました");
  };

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
