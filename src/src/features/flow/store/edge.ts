import { Edge } from "@xyflow/react";
import { atom } from "jotai";

import { initialEdges } from "@/features/flow/config/initial/edge";

export const edgesAtom = atom<Edge[]>(initialEdges);
