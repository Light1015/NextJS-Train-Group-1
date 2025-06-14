"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

const Separator = React.forwardRef<
    React.ElementRef<typeof SeparatorPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
    (
        { className = "", orientation = "horizontal", decorative = true, ...props },
        ref
    ) => {
        const base = "shrink-0 bg-border";
        const direction =
            orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]";
        const combined = `${base} ${direction} ${className}`;

        return (
            <SeparatorPrimitive.Root
                ref={ref}
                decorative={decorative}
                orientation={orientation}
                className={combined}
                {...props}
            />
        );
    }
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
