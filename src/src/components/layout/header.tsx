"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const Header = ({ children }: Props) => {
  return (
    <header className="w-full fixed top-0 border-b font-noto-sans-jp">
      <div className="px-10 mx-auto h-12 flex justify-start items-center gap-2">
        <h1 className="flex items-center">
          <Image
            src={"/site-logo.png"}
            alt="サイトのロゴ"
            width={120}
            height={48}
          />
        </h1>
        {children}
        {/**
          <Button
            variant={"outline"}
            size={"icon"}
            className='ml-auto size-8'
            asChild
            >
            <Link 
              href={"/"}
              >
              <GitHubLogoIcon />
            </Link>
          </Button>
         */}
      </div>
    </header>
  );
};
