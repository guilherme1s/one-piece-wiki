"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type DialogRootProps = ComponentProps<typeof DialogPrimitive.Root>;

const DialogRoot = (props: DialogRootProps) => (
  <DialogPrimitive.Root {...props} />
);

type DialogTriggerProps = ComponentProps<typeof DialogPrimitive.Trigger>;

const DialogTrigger = (props: DialogTriggerProps) => (
  <DialogPrimitive.Trigger {...props} />
);

type DialogOverlayProps = ComponentProps<typeof DialogPrimitive.Overlay>;

const DialogOverlay = ({ className, ...props }: DialogOverlayProps) => (
  <DialogPrimitive.Overlay
    className={twMerge(
      "fixed inset-0 z-50 bg-bg-overlay backdrop-blur-sm",
      "data-[state=open]:animate-dialog-overlay-in data-[state=closed]:animate-dialog-overlay-out",
      className,
    )}
    {...props}
  />
);

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
} as const;

interface DialogContentProps extends ComponentProps<
  typeof DialogPrimitive.Content
> {
  size?: keyof typeof sizeMap;
}

const DialogContent = ({
  className,
  size = "md",
  children,
  ...props
}: DialogContentProps) => (
  <DialogPrimitive.Portal>
    <DialogOverlay />

    <DialogPrimitive.Content
      className={twMerge(
        "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-h-[85dvh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-border bg-bg-card p-6 shadow-2xl",
        sizeMap[size],
        "data-[state=open]:animate-dialog-content-in data-[state=closed]:animate-dialog-content-out",
        className,
      )}
      {...props}
    >
      {children}

      <DialogCloseButton />
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);

type DialogHeaderProps = ComponentProps<"div">;

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div className={twMerge("mb-4 pr-10", className)} {...props} />
);

type DialogBodyProps = ComponentProps<"div">;

const DialogBody = ({ className, ...props }: DialogBodyProps) => (
  <div className={twMerge("flex flex-col gap-4", className)} {...props} />
);

type DialogFooterProps = ComponentProps<"div">;

const DialogFooter = ({ className, ...props }: DialogFooterProps) => (
  <div
    className={twMerge(
      "-mx-6 -mb-6 mt-5 flex flex-wrap items-center gap-2 border-t border-border bg-bg-elevated/40 px-5 py-3",
      className,
    )}
    {...props}
  />
);

type DialogTitleProps = ComponentProps<typeof DialogPrimitive.Title>;

const DialogTitle = ({ className, ...props }: DialogTitleProps) => (
  <DialogPrimitive.Title
    className={twMerge(
      "font-heading text-xl font-semibold uppercase tracking-wide",
      className,
    )}
    {...props}
  />
);

type DialogDescriptionProps = ComponentProps<
  typeof DialogPrimitive.Description
>;

const DialogDescription = ({ className, ...props }: DialogDescriptionProps) => (
  <DialogPrimitive.Description
    className={twMerge("text-sm text-text-muted", className)}
    {...props}
  />
);

type DialogCloseProps = ComponentProps<typeof DialogPrimitive.Close>;

const DialogClose = ({ className, children, ...props }: DialogCloseProps) => (
  <DialogPrimitive.Close
    type="button"
    className={twMerge(
      "rounded-md px-4 py-2 text-sm text-text transition-colors duration-200",
      "outline-none focus-visible:ring-2 focus-visible:ring-primary",
      className,
    )}
    {...props}
  >
    {children}
  </DialogPrimitive.Close>
);

type DialogCloseButtonProps = ComponentProps<typeof DialogPrimitive.Close>;

const DialogCloseButton = ({ className, ...props }: DialogCloseButtonProps) => (
  <DialogPrimitive.Close
    type="button"
    aria-label="Fechar"
    className={twMerge(
      "absolute right-4 top-4 rounded-md p-1 text-text-muted transition-colors duration-200 hover:bg-bg-elevated hover:text-text",
      "outline-none focus-visible:ring-2 focus-visible:ring-primary",
      className,
    )}
    {...props}
  >
    <X className="h-5 w-5" />
  </DialogPrimitive.Close>
);

export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
  CloseButton: DialogCloseButton,
};
