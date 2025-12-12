import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

type SwitchRootProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>;

interface IconSwitchProps extends SwitchRootProps {
  checkedIcon: React.ReactNode;
  uncheckedIcon: React.ReactNode;
}

function IconSwitch({
  checkedIcon,
  uncheckedIcon,
  className,
  ...props
}: IconSwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        `
        peer
        group
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
          rounded-md
          size-8
          -translate-y-0.5
          hover:-translate-y-1
          active:-translate-y-0

          flex items-center justify-center 

          bg-background
          dark:data-[state=unchecked]:bg-foreground
          dark:data-[state=checked]:bg-primary-foreground

          data-[state=checked]:translate-x-[calc(100%)]
          data-[state=unchecked]:translate-x-0
        `
        )}
      >
        <span className="hidden group-data-[state=checked]:block">
          {checkedIcon}
        </span>

        <span className="block group-data-[state=checked]:hidden">
          {uncheckedIcon}
        </span>
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}

IconSwitch.displayName = "IconSwitch";

export default IconSwitch;
