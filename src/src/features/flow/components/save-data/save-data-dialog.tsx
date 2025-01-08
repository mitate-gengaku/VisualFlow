import { useAtom, useAtomValue } from "jotai";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDataStorage } from "@/features/flow/hooks/use-data-storage";
import { saveDataDialogAtom } from "@/features/flow/store/open-save-data-dialog";
import { saveDataAtom } from "@/features/flow/store/save-data";
import { getMatchingLocalStorageData } from "@/features/flow/utils/get-matching-localstorage-data";

export const SaveDataDialog = () => {
  const [index, setIndex] = useState<number>(0);
  const [showSaveDataDialog, setSaveDataDialog] = useAtom(saveDataDialogAtom);
  const saveData = useAtomValue(saveDataAtom);
  const allSaveData = useMemo(() => {
    return getMatchingLocalStorageData("save-data-");
  }, [saveData]);

  const { onRestoreFromParams } = useDataStorage();

  return (
    <Dialog open={showSaveDataDialog} onOpenChange={setSaveDataDialog}>
      <DialogContent className="font-noto-sans-jp flex flex-col">
        <DialogHeader>
          <DialogTitle>保存データ</DialogTitle>
          <DialogDescription>保存データを選択してください</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead />
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
                  <TableCell>
                    {new Date(data.created_at).toLocaleString("sv-SV")}
                  </TableCell>
                  <TableCell>
                    {new Date(data.updated_at).toLocaleString("sv-SV")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            className="bg-sky-500 hover:bg-sky-600"
            onClick={() => {
              onRestoreFromParams(allSaveData[index]);
              setSaveDataDialog(false);
            }}
          >
            開く
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
