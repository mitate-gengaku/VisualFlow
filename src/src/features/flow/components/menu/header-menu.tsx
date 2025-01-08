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
        <MenubarTrigger>ファイル</MenubarTrigger>
        <MenubarContent className="font-noto-sans-jp">
          <MenubarItem onClick={() => setSaveDataDialog((show) => !show)}>
            開く
          </MenubarItem>
          <MenubarItem onClick={() => onSave()}>保存</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
