import { Header } from "@/components/layout/header";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Flow } from "@/features/flow/components/react-flow";
import { ReactFlowProvider } from "@xyflow/react";

export const TopPage = () => {
  return (
    <ReactFlowProvider>
      <Header />
      <main className="w-full h-full pt-12">
        <ResizablePanelGroup
          direction="horizontal"
          >
          <ResizablePanel
            className="h-screen overflow-hidden border-r pt-4"
            minSize={20}
            defaultSize={30}
            maxSize={30}
            >
              4
          </ResizablePanel>
          <ResizableHandle
            withHandle
            />
          <ResizablePanel
            defaultSize={70}
            >
            <Flow />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </ReactFlowProvider>
  );
}
