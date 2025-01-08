import { ControlButton } from "@xyflow/react";

import { useZoomLevel } from "@/features/flow/hooks/use-zoom-level";

export const ZoomLevelControl = () => {
  const { zoom, onSetZoomLevelHandler } = useZoomLevel();

  return (
    <ControlButton
      className="text-[10px]"
      onClick={() => onSetZoomLevelHandler()}
    >
      {zoom}%
    </ControlButton>
  );
};
