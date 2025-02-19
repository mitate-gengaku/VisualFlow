import { useSetAtom } from "jotai";
import Link from "next/link";

import { GithubLogoIcon } from "@/components/icons/github";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { SidebarMenu as NodeMenu } from "@/features/flow/components/menu/sidebar-menu";
import { useDataStorage } from "@/features/flow/hooks/use-data-storage";
import { saveDataDialogAtom } from "@/features/flow/store/open-save-data-dialog";

export function MobileSidebar() {
  const setSaveDataDialog = useSetAtom(saveDataDialogAtom);

  const { onSave } = useDataStorage();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>File</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setSaveDataDialog((open) => !open)}
                >
                  Open
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => onSave()}>
                  Save
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Node</SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <NodeMenu />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarMenuButton>
          <Link
            href={"https://github.com/mitate-gengaku/VisualFlow"}
            className="flex items-center gap-2"
          >
            <GithubLogoIcon />
            Go to Github
          </Link>
        </SidebarMenuButton>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
