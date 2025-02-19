"use client";

import { Sidebar } from "@/components/layout/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { SidebarMenu } from "@/features/flow/components/menu/sidebar-menu";
import { Flow } from "@/features/flow/components/react-flow";
import { useIsMobile } from "@/hooks/use-mobile";

export const Main = () => {
  const isMobile = useIsMobile();

  return (
    <main className="w-full h-full pt-12">
      {isMobile ? (
        <Flow />
      ) : (
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            className="h-screen overflow-hidden border-r pt-4"
            minSize={20}
            defaultSize={30}
            maxSize={30}
          >
            <Sidebar>
              <SidebarMenu />
            </Sidebar>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={70}>
            <Flow />
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </main>
  );
};
