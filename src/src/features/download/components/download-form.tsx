import { Button } from "@/components/ui/button"
import { useDownload } from "../hooks/use-download"

export const DownloadForm = () => {
  const {
    onDownload,
  } = useDownload();

  return (
    <form
      onSubmit={onDownload}
      >
      <Button>ダウンロード</Button>
    </form>
  )
}