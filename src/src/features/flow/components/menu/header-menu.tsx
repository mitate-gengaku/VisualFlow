"use client";

import { useSetAtom } from "jotai";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useDataStorage } from "@/features/flow/hooks/use-data-storage";
import { saveDataDialogAtom } from "@/features/flow/store/open-save-data-dialog";

export const HeaderMenu = () => {
  const setSaveDataDialog = useSetAtom(saveDataDialogAtom);

  const { onSave } = useDataStorage();

  return (
    <Menubar className="border-0 shadow-none">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent className="">
          <MenubarItem onClick={() => setSaveDataDialog((show) => !show)}>
            Open
          </MenubarItem>
          <MenubarItem onClick={() => onSave()}>Save</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
