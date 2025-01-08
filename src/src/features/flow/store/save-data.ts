import { atomWithStorage } from "jotai/utils";

import { FlowData } from "@/features/flow/types/flow-data";
import { generateStorageKey } from "@/features/flow/utils/generate-storage-key";

export const saveDataAtom = atomWithStorage<FlowData | undefined>(
  generateStorageKey(),
  undefined,
);
