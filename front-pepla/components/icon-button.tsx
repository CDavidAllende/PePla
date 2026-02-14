import { ButtonHTMLAttributes, ReactNode } from "react"

type IconButtonProps = {
  icon: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

const IconButton = ({ icon, className = "", ...props }: IconButtonProps) => {
  return (
    <button
      {...props}
      className={`
        flex items-center justify-center
        p-2 rounded-full
        bg-white shadow-md
        hover:bg-gray-100
        transition
        ${className}
      `}
    >
      {icon}
    </button>
  )
}

export default IconButton
