"use client"

import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { atom, useAtom } from "jotai"

export const showMinimapAtom = atom<boolean>(true);
export const showControlAtom = atom<boolean>(true);

export const Header = () => {
  const [isShowMinimap, setShowMinimap] = useAtom(showMinimapAtom);
  const [isShowControl, setShowControl] = useAtom(showControlAtom);

  return (
    <header
      className="w-full fixed top-0 border-b font-noto-sans-jp"
      >
      <div
        className="px-10 mx-auto h-12 flex justify-between items-center gap-2"
        >
        <Menubar className="border-0 shadow-none">
          <MenubarMenu>
            <MenubarTrigger>ファイル</MenubarTrigger>
            <MenubarContent className="font-noto-sans-jp">
              <MenubarItem>
                新規作成
              </MenubarItem>
              <MenubarItem
                >
                開く
              </MenubarItem>
              <MenubarItem>
                保存
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>表示</MenubarTrigger>
            <MenubarContent className="font-noto-sans-jp">
              <MenubarCheckboxItem checked={isShowMinimap} onCheckedChange={setShowMinimap}>
                ミニマップを表示
              </MenubarCheckboxItem>
              <MenubarCheckboxItem checked={isShowControl} onCheckedChange={setShowControl}>
                コントロールパネルを表示
              </MenubarCheckboxItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <Button
          variant={"outline"}
          size={"icon"}
          className='ml-auto size-8'
          asChild
          >
          <Link 
            href={"/"}
            >
            <GitHubLogoIcon />
          </Link>
        </Button>
      </div>
    </header>
  )
}