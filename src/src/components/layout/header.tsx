import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"


export const Header = () => {
  return (
    <header
      className="w-full fixed top-0 border-b font-noto-sans-jp"
      >
      <div
        className="px-10 mx-auto h-12 flex justify-between items-center gap-2"
        >
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
      </div>
    </header>
  )
}