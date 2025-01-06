import { useAtom, useSetAtom } from "jotai"
import { edgesAtom, FlowData, nodesAtom, saveDataAtom } from "../components/react-flow"
import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { toast } from "sonner";

export const useDataStorage = () => {
  const setNodes = useSetAtom(nodesAtom);
  const setEdges = useSetAtom(edgesAtom);
  const [saveData, setSaveData] = useAtom(saveDataAtom);
  const {
    toObject,
    setViewport
  } = useReactFlow();

  /**
   * ノード・エッジ・ビューポートの保存を行う関数
   *  
   * @remarks
   * この関数は以下の手順を実行する：
   * 1. 各データをlocalStorageに保存
   * 2. トーストメッセージを表示
   */
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
    toast.success("保存しました")
  }, [saveData]);



  /**
   * ノード・エッジ・ビューポートの保存データを復元する関数
   * 
   * @remarks
   * この関数は以下の手順を実行する：
   * 1. 保存データがnullまたはundefinedかを確認
   * 2. インスタンスからノード、エッジ、ビューポートを取得
   * 3. 各状態（ノード、エッジ、ビューポート）を更新
   * 4. トーストメッセージを表示
   * 
   * @returns void
   */
  const onRestore = useCallback(() => {
    if (!saveData) {
      return;
    }

    const {
      nodes,
      edges,
      viewport
    } = saveData;

    setNodes(nodes);
    setEdges(edges);
    setViewport(viewport);

    toast.success("データを復元しました")
  }, [saveData]);

  const onRestoreFromParams = (data: FlowData | undefined) => {
    if (!data) {
      return;
    }

    const {
      nodes,
      edges,
      viewport
    } = data;

    setNodes(nodes);
    setEdges(edges);
    setViewport(viewport);

    toast.success("データを復元しました")
  };


  return {
    onSave,
    onRestore,
    onRestoreFromParams
  }
}