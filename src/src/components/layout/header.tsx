"use client"

import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "../ui/menubar"
import { useDataStorage } from "@/features/flow/hooks/use-data-storage"
import { atom, useAtom, useAtomValue } from "jotai"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { saveDataAtom } from "@/features/flow/components/react-flow"
import { Edge, Node, ReactFlowJsonObject, Viewport } from "@xyflow/react"
import { useMemo, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "../ui/checkbox"

interface FlowData extends ReactFlowJsonObject<Node, Edge> {
  created_at: string;
  updated_at: string;
}

function getMatchingLocalStorageData(regexPattern: string): FlowData[] {
  const matchingData: FlowData[] = [];
  if (typeof localStorage === "undefined") return [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && new RegExp(regexPattern).test(key)) {
      try {
        const value = JSON.parse(localStorage.getItem(key) || '');
        
        if (
          Array.isArray(value.nodes) &&
          Array.isArray(value.edges) &&
          typeof value.viewport === 'object' &&
          typeof value.viewport.x === 'number' &&
          typeof value.viewport.y === 'number' &&
          typeof value.viewport.zoom === 'number' &&
          typeof value.created_at === 'string' &&
          typeof value.updated_at === 'string'
        ) {
          const validNodes = value.nodes.every((node: any) =>
            typeof node.id === 'string' &&
            typeof node.data === 'object' &&
            typeof node.position === 'object' &&
            typeof node.position.x === 'number' &&
            typeof node.position.y === 'number' &&
            typeof node.type === 'string' &&
            typeof node.measured === 'object' &&
            typeof node.measured.width === 'number' &&
            typeof node.measured.height === 'number'
          );

          const validEdges = value.edges.every((edge: any) =>
            typeof edge.source === 'string' &&
            typeof edge.target === 'string' &&
            typeof edge.type === 'string' &&
            typeof edge.id === 'string' &&
            typeof edge.animated === 'boolean'
          );

          if (validNodes && validEdges) {
            matchingData.push(value as FlowData);
          }
        }
      } catch (error) {
        console.error(`Error parsing localStorage item with key ${key}:`, error);
      }
    }
  }

  return matchingData;
}

export const saveDataDialog = atom<boolean>(false);

export const Header = () => {
  const [index, setIndex] = useState<number>(0);
  const [showSaveDataDialog, setSaveDataDialog] = useAtom(saveDataDialog);
  const saveData = useAtomValue(saveDataAtom)
  const allSaveData = useMemo(() => {
    return getMatchingLocalStorageData("save-data-")
  }, [saveData]);

  const {
    onSave,
    onRestoreFromParams
  } = useDataStorage();

  return (
    <header
      className="w-full fixed top-0 border-b font-noto-sans-jp"
      >
      <div
        className="px-10 mx-auto h-12 flex justify-start items-center gap-2"
        >
        <h1 className="flex items-center">
        <Image
          src={"/site-logo.png"}
          alt="サイトのロゴ"
          width={120}
          height={48}
          />
        </h1>
        <Menubar className="border-0 shadow-none">
          <MenubarMenu>
            <MenubarTrigger>ファイル</MenubarTrigger>
            <MenubarContent className="font-noto-sans-jp">
              <MenubarItem onClick={() => setSaveDataDialog((show) => !show)}>
                開く
              </MenubarItem>
              <MenubarItem
                onClick={() => onSave()}
                >
                保存
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <Dialog open={showSaveDataDialog} onOpenChange={setSaveDataDialog}>
          <DialogContent className='font-noto-sans-jp flex flex-col'>
            <DialogHeader>
              <DialogTitle>保存データ</DialogTitle>
              <DialogDescription>保存データを選択してください</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead  />
                    <TableHead>作成日</TableHead>
                    <TableHead>更新日</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allSaveData.map((data, i) => (
                    <TableRow key={`${data.created_at}-${data.updated_at}-${i}`}>
                      <TableCell>
                        <Checkbox 
                          checked={index === i} 
                          onCheckedChange={() => setIndex(i)} 
                          className="size-[calc(1rem+2px)] data-[state=checked]:border-sky-500 data-[state=checked]:bg-sky-500"
                          />
                      </TableCell>
                      <TableCell>{new Date(data.created_at).toLocaleString("sv-SV")}</TableCell>
                      <TableCell>{new Date(data.updated_at).toLocaleString("sv-SV")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button
                className="bg-sky-500 hover:bg-sky-600"
                onClick={() => {
                  onRestoreFromParams(allSaveData[index])
                  setSaveDataDialog(false);
                }}
                >
                開く
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        {/**
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
         */}
      </div>
    </header>
  )
}