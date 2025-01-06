import { Button } from "@/components/ui/button"
import { useDownload } from "../hooks/use-download"
import { Label } from "@/components/ui/label";

export const DownloadForm = () => {
  const {
    onDownload,
  } = useDownload();

  return (
    <form
      onSubmit={onDownload}
      >
      <div className="flex flex-col gap-2">
        <Label className="w-fit text-xs text-gray-500 cursor-text">YAMLファイルがダウンロードされます</Label>
        <Button>ダウンロード</Button>
      </div>
    </form>
  )
}