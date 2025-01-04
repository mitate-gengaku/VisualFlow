import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useDownload } from '../hooks/use-download';
import { CopyButton } from './copy-button';

export const CodeBlock = () => {
  const {
    code,
  } = useDownload();

  return (
    <div className='relative'>
      <CopyButton 
        variant={"ghost"}
        size={"icon"}
        className='size-6 absolute right-6 top-3 hover:bg-transparent text-white hover:text-gray-400'
        />
      <SyntaxHighlighter 
        language="yaml"
        style={vscDarkPlus}
        customStyle={{
          height: "20rem"
        }}
        >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}