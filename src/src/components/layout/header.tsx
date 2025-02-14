"use client";

import Link from "next/link";
import { ReactNode } from "react";

import { GithubLogoIcon } from "@/components/icons/github";
import { Button } from "@/components/ui/button";
import { ToggleThemeButton } from "@/features/theme/components/toggle-button";
import { SiteLogo } from "@/components/icons/site-logo";

interface Props {
  children?: ReactNode;
}

export const Header = ({ children }: Props) => {
  return (
    <header className="w-full fixed top-0 border-b">
      <div className="px-10 mx-auto h-12 flex justify-start items-center gap-2">
        <h1 className="select-none flex items-center font-bold cursor-default">
          <SiteLogo className="w-24 h-7" />
        </h1>
        {children}
        <ToggleThemeButton />
        <Button
          variant={"outline"}
          size={"icon"}
          className="size-8"
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
