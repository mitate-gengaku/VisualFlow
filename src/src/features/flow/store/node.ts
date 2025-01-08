import { Node } from "@xyflow/react";
import { atom } from "jotai";

import { initialNodes } from "@/features/flow/config/initial/node";

export const nodesAtom = atom<Node[]>(initialNodes);
