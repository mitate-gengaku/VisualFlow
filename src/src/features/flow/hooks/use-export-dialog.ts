import { useAtom } from "jotai";

import { openDialogAtom } from "@/features/flow/store/open-export-dialog";

export const useExportDialog = () => {
  const [isOpen, setOpen] = useAtom(openDialogAtom);

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const onOpenHandler = () => {
    setOpen((open) => !open);
  };

  return {
    isOpen,
    onOpenChange,
    onOpenHandler,
  };
};
