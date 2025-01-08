import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDownload } from "@/features/flow/hooks/use-download";

export const DownloadForm = () => {
  const { onDownload } = useDownload();

  return (
    <form onSubmit={onDownload}>
      <div className="flex flex-col gap-2">
        <Label className="w-fit text-xs text-gray-500 cursor-text">
          YAMLファイルがダウンロードされます
        </Label>
        <Button className="bg-sky-600 hover:bg-sky-700">ダウンロード</Button>
      </div>
    </form>
  );
};
