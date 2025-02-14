import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useExport } from "@/features/flow/hooks/use-export";

export const DownloadForm = () => {
  const { onDownload } = useExport();

  return (
    <form onSubmit={onDownload}>
      <div className="flex flex-col gap-2">
        <Label className="w-fit text-xs text-gray-500 cursor-text">
          The YAML file will be downloaded automatically
        </Label>
        <Button className="bg-sky-600 hover:bg-sky-700">Download</Button>
      </div>
    </form>
  );
};
