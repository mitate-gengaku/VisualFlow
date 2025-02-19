"use client";

import Link from "next/link";
import { ReactNode } from "react";

import { GithubLogoIcon } from "@/components/icons/github";
import { SiteLogo } from "@/components/icons/site-logo";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ToggleThemeButton } from "@/features/theme/components/toggle-button";
import { useIsMobile } from "@/hooks/use-mobile";

interface Props {
  children?: ReactNode;
}

export const Header = ({ children }: Props) => {
  const isMobile = useIsMobile();

  return (
    <header className="w-full fixed top-0 border-b">
      <div className="px-4 mx-auto h-12 flex justify-start items-center gap-2 relative md:static">
        {isMobile && (
          <>
            <SidebarTrigger className="absolute left-4 md:hidden" />
            <MobileSidebar />
          </>
        )}
        <h1 className="mx-auto md:mx-0 select-none flex items-center font-bold cursor-default">
          <SiteLogo className="w-24 h-7" />
        </h1>
        {children}
        {!isMobile && <ToggleThemeButton />}
        <Button
          variant={"outline"}
          size={"icon"}
          className="hidden md:flex size-8"
          asChild
        >
          <Link href={"https://github.com/mitate-gengaku/VisualFlow"}>
            <GithubLogoIcon />
          </Link>
        </Button>
      </div>
    </header>
  );
};
