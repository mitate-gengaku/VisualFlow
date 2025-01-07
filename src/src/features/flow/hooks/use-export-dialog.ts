import { atom, useAtom } from "jotai";

const openDialogAtom = atom<boolean>(false);

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
