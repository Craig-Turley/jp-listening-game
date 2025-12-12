import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        `
      peer
      rounded-md
      inline-flex
      h-8
      w-16
      shrink-0
      items-center
      outline-none
      cursor-pointer

      data-[state=checked]:bg-primary
      data-[state=unchecked]:bg-input
      dark:data-[state=unchecked]:bg-input/80

      disabled:cursor-not-allowed
      disabled:opacity-50
    `,
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          `
        block
        rounded-md
        size-8
        -translate-y-0.5
        hover:-translate-y-1
        active:-translate-y-0

        bg-background
        dark:data-[state=unchecked]:bg-foreground
        dark:data-[state=checked]:bg-primary-foreground

        data-[state=checked]:translate-x-[calc(100%)]
        data-[state=unchecked]:translate-x-0
      `
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
