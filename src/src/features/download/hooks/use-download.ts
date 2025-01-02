import { FormEvent } from "react";

export const useDownload = () => {
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

    const content = "Hello World";
    const fileName = "test.yml"

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

  return {
    onDownload
  }
}