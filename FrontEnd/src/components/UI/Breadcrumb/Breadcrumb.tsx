"use client";

import * as React from "react";
import { ChevronRightIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Slot } from "@radix-ui/react-slot";

// Root <nav>
const Breadcrumb = React.forwardRef<
    HTMLElement,
    React.ComponentPropsWithoutRef<"nav"> & {
        separator?: React.ReactNode;
    }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

// <ol> list wrapper
const BreadcrumbList = React.forwardRef<
    HTMLOListElement,
    React.ComponentPropsWithoutRef<"ol">
>(({ className = "", ...props }, ref) => (
    <ol
        ref={ref}
        className={`flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5 ${className}`}
        {...props}
    />
));
BreadcrumbList.displayName = "BreadcrumbList";

// <li> item
const BreadcrumbItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentPropsWithoutRef<"li">
>(({ className = "", ...props }, ref) => (
    <li
        ref={ref}
        className={`inline-flex items-center gap-1.5 ${className}`}
        {...props}
    />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

// <a> link (optionally with Slot)
const BreadcrumbLink = React.forwardRef<
    HTMLAnchorElement,
    React.ComponentPropsWithoutRef<"a"> & {
        asChild?: boolean;
    }
>(({ asChild, className = "", ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return (
        <Comp
            ref={ref}
            className={`transition-colors hover:text-foreground ${className}`}
            {...props}
        />
    );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

// Current page <span>
const BreadcrumbPage = React.forwardRef<
    HTMLSpanElement,
    React.ComponentPropsWithoutRef<"span">
>(({ className = "", ...props }, ref) => (
    <span
        ref={ref}
        role="link"
        aria-disabled="true"
        aria-current="page"
        className={`font-normal text-foreground ${className}`}
        {...props}
    />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

// Separator <li>
const BreadcrumbSeparator = ({
    children,
    className = "",
    ...props
}: React.ComponentProps<"li">) => (
    <li
        role="presentation"
        aria-hidden="true"
        className={`[&>svg]:size-3.5 ${className}`}
        {...props}
    >
        {children ?? <ChevronRightIcon />}
    </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

// Ellipsis <span>
const BreadcrumbEllipsis = ({
    className = "",
    ...props
}: React.ComponentProps<"span">) => (
    <span
        role="presentation"
        aria-hidden="true"
        className={`flex h-9 w-9 items-center justify-center ${className}`}
        {...props}
    >
        <DotsHorizontalIcon className="h-4 w-4" />
        <span className="sr-only">More</span>
    </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

// Export all
export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
};
