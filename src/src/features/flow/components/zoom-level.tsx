import { ControlButton, useReactFlow, useViewport } from "@xyflow/react";

export const ZoomLevel = () => {
  const {
    zoom
  } = useViewport();
  const {
    zoomTo
  } = useReactFlow();

  return (
    <ControlButton
      className="text-[10px]"
      onClick={() => zoomTo(1, { duration: 1000 })}
      >
      {(100 * zoom).toFixed(0)}%
    </ControlButton>
  )
}