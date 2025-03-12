import { LuImage } from 'react-icons/lu'

type FileUploadInstructionsProps = {
  fileType: string
  fileExtensions: string[]
  fileSize: number
  note: string
}

export const FileUploadInstructions = ({
  fileType,
  fileExtensions,
  fileSize,
  note
}: FileUploadInstructionsProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 p-2 text-center">
      <LuImage className="mb-2 text-4xl text-zinc-400" />

      <span className="text-sm font-medium tracking-wide sm:text-base">
        Select an {fileType} file to see a preview
      </span>

      <div className="space-y-1 text-xs text-zinc-500 sm:text-sm">
        <p>Supported: {fileExtensions.join(', ')}</p>

        <p>Max Size: {fileSize} MB</p>

        <p>{note}</p>
      </div>
    </div>
  )
}
