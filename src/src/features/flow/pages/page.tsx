import { ReactFlowProvider } from "@xyflow/react";

import { HeaderMenu } from "../components/menu/header-menu";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Flow } from "@/features/flow/components/react-flow";

export const TopPage = () => {
  return (
    <ReactFlowProvider>
      <Header>
        <HeaderMenu />
      </Header>
      <main className="w-full h-full pt-12">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            className="h-screen overflow-hidden border-r pt-4"
            minSize={20}
            defaultSize={30}
            maxSize={30}
          >
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={70}>
            <Flow />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </ReactFlowProvider>
  );
};
