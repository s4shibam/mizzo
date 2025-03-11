import { IconType } from 'react-icons'

type CustomIconProps = React.SVGAttributes<SVGElement> & {
  size?: string | number
  color?: string
  className?: string
}

export const MusicArtist: IconType = ({
  size,
  color,
  className,
  ...props
}: CustomIconProps) => {
  return (
    <svg
      className={className}
      fill="currentColor"
      height="1em"
      stroke="currentColor"
      strokeWidth="0"
      style={{
        color,
        ...props.style,
        width: size,
        height: size
      }}
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        <path
          d="M22,10h-4v2v3.51C17.58,15.19,17.07,15,16.5,15c-1.38,0-2.5,1.12-2.5,2.5c0,1.38,1.12,2.5,2.5,2.5 c1.36,0,2.46-1.08,2.5-2.43V12h3V10z M3.06,19c0.38-3.11,2.61-6.10,7.94-6.10c0.62,0,1.19,0.05,1.73,0.13l0.84-0.84 c-0.58-0.13-1.19-0.23-1.85-0.26C13.58,11.59,15,9.96,15,8c0-2.21-1.79-4-4-4C8.79,4,7,5.79,7,8c0,1.96,1.42,3.59,3.28,3.93 C4.77,12.21,2,15.76,2,20h10.02L12,19H3.06z M8,8c0-1.65,1.35-3,3-3s3,1.35,3,3s-1.35,3-3,3S8,9.65,8,8z"
          strokeWidth="0.4"
        />
      </g>
    </svg>
  )
}
