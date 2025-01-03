import { useAtom, useSetAtom } from "jotai"
import { edgesAtom, instanceAtom, nodesAtom } from "../components/react-flow"
import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { toast } from "sonner";

export const useDataStorage = () => {
  const setNodes = useSetAtom(nodesAtom);
  const setEdges = useSetAtom(edgesAtom);
  const [instance, setInstance] = useAtom(instanceAtom);
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
    setInstance(data);
    toast.success("保存しました")
  }, []);



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
    if (!instance) {
      return;
    }

    const {
      nodes,
      edges,
      viewport
    } = instance;

    setNodes(nodes);
    setEdges(edges);
    setViewport(viewport);

    toast.success("データを復元しました")
  }, [instance]);

  return {
    onSave,
    onRestore
  }
}