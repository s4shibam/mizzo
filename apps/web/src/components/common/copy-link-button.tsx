import toast from 'react-hot-toast'
import { LuClipboardCheck, LuClipboardCopy } from 'react-icons/lu'

import { useClipboard } from '@/hooks/custom/use-clipboard'

type CopyLinkButtonProps = {
  className?: string
  link: string
}

export const CopyLinkButton = ({ className, link }: CopyLinkButtonProps) => {
  const { isCopied, copy, copyError } = useClipboard()

  const copyLinkToClipboard = async () => {
    await copy(link)
    if (copyError) {
      console.error('Failed to copy URL to clipboard', copyError)
    } else {
      toast.success('Link Copied!')
    }
  }
  return (
    <div className={className} onClick={copyLinkToClipboard}>
      {isCopied ? <LuClipboardCheck /> : <LuClipboardCopy />}
      <span>Copy Link to Share</span>
    </div>
  )
}
