import { Connection } from "@xyflow/react";
import { atom } from "jotai";

export const connectionAtom = atom<Connection | undefined>(undefined);
