import { CameraIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useDownload } from "@/features/flow/hooks/use-download";

export const DownloadPictureButton = () => {
  const { onDownloadPicture } = useDownload();

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={() => onDownloadPicture()}
      className="size-6 [&>svg]:!size-4 hover:bg-transparent"
    >
      <CameraIcon />
    </Button>
  );
};
