import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        accent: "bg-accent text-primary-foreground hover:bg-accent/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  const isDisabled = Boolean(disabled)

  return (
    <Comp
      data-slot="button"
      {...(!asChild && { disabled: isDisabled })}
      aria-disabled={asChild ? isDisabled : undefined}
      className={cn(
        "relative inline-block",
        isDisabled ? "cursor-not-allowed" : "cursor-pointer",
      )}
      {...props}
    >
      <span className="absolute inset-0 border rounded-md bg-border pointer-events-none" />

      <div
        className={cn(
          buttonVariants({ variant, size }),
          "rounded-md -translate-y-1.5 hover:-translate-y-2 active:-translate-y-0.5",
          isDisabled && [
            "opacity-50 pointer-events-none",
            "translate-y-0 hover:translate-y-0 active:translate-y-0",
          ],
          className,
        )}
      >
        {children}
      </div>
    </Comp>
  )
}

export { Button, buttonVariants }

