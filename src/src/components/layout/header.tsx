"use client";

import Link from "next/link";
import { ReactNode } from "react";

import { GithubLogoIcon } from "@/components/icons/github";
import { Button } from "@/components/ui/button";

interface Props {
  children?: ReactNode;
}

export const Header = ({ children }: Props) => {
  return (
    <header className="w-full fixed top-0 border-b">
      <div className="px-10 mx-auto h-12 flex justify-start items-center gap-2">
        <h1 className="flex items-center font-bold cursor-default">
          VisualFlow
        </h1>
        {children}
        <Button
          variant={"outline"}
          size={"icon"}
          className="ml-auto size-8"
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
