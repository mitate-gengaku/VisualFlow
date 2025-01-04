"use client"

import { getConnectedEdges, useReactFlow } from "@xyflow/react";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { TransformDataClass } from "../utils/transform-data";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { edgesAtom, nodesAtom, workflowCodeAtom } from "@/features/flow/components/react-flow";
import { toast } from "sonner";

export const useDownload = () => {
  const [isSuccessCopy, setSuccessCopy] = useState<boolean>(false);
  const nodes = useAtomValue(nodesAtom);
  const edges = useAtomValue(edgesAtom);
  const [workflowCode, setWorkflowCode] = useAtom(workflowCodeAtom);

  /**
   * ファイルをダウンロード処理を行う関数
   * 
   * @param {FormEvent<HTMLFormElement>} e - フォームの送信イベント
   * 
   * @remarks
   * この関数は以下の手順を実行する：
   * 1. イベントのデフォルト動作を防止
   * 2. ダウンロードするコンテンツとファイル名を設定
   * 3. Blobオブジェクトを作成
   * 4. ダウンロード用のURLを生成
   * 5. 一時的なリンク要素を作成してクリックし、ダウンロードを開始
   * 6. 使用後にリンク要素を削除し、オブジェクトURLを解放
   */
  
  const onDownload = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const connectedEdges = getConnectedEdges(nodes, edges);
    const TransformData = new TransformDataClass(nodes, connectedEdges);

    const content = TransformData.generateYaml();
    const fileName = "test.yml"

    setWorkflowCode(content)

    const blob = new Blob([content]);
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
  }

  const onCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(workflowCode);
      setSuccessCopy(true);
    } catch (e) {
      toast.error("コピーに失敗しました")
      return;
    }
  }

  useEffect(() => {
    const connectedEdges = getConnectedEdges(nodes, edges);
    const TransformData = new TransformDataClass(nodes, connectedEdges);

    const content = TransformData.generateYaml();

    setWorkflowCode(content)
  }, [nodes, edges]);

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
    onCopyToClipboard
  }
}