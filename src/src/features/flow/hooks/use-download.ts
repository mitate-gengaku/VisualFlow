"use client"

import { downPicture } from '@/features/flow/utils/download-picture';
import { getNodesBounds, getViewportForBounds, useReactFlow } from '@xyflow/react';
import { toPng } from 'html-to-image';

export const useDownload = () => {
  const { getNodes } = useReactFlow();
  const imageWidth = 1024;
  const imageHeight = 768;

  const onDownloadPicture = () => {
    const element = document.querySelector<HTMLElement>('.react-flow__viewport');
    
    if (!element) return;

    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2,
      0
    );
 
    toPng(element, {
      backgroundColor: '#1f2937',
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth.toString(),
        height: imageHeight.toString(),
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then(downPicture);
  };

  return {
    onDownloadPicture
  }
}