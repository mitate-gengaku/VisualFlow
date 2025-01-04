import { Button, ButtonProps } from "@/components/ui/button"
import { CheckIcon, CopyIcon } from "lucide-react"
import { useDownload } from "../hooks/use-download";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface Props extends ButtonProps, RefAttributes<HTMLButtonElement> {

}

export const CopyButton = (props: Props) => {
  const {
    isSuccessCopy,
    onCopyToClipboard
  } = useDownload();

  return (
    <Button
      {...props}
      onClick={() => onCopyToClipboard()}
      >
      {isSuccessCopy ? (
        <CheckIcon className='text-green-500' />
      ) : (
        <CopyIcon />
      )}
    </Button>
  )
}