import { cn } from "@/lib/utils"
import React, { forwardRef } from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      disabled,
      type = "button",
      variant = "default",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={cn(
          "w-auto rounded-full  px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50 font-semibold hover:opacity-75 transition",
          {
            "bg-black border-transparent text-white": variant === "default",
            "bg-white border border-black text-black": variant === "outline",
          },
          className,
        )}
        ref={ref}
        {...props}
        disabled={disabled}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

export default Button
