import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef } from "react"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-sm text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:bg-neutral disabled:text-neutral-foreground rounded-lg gap-1",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        accent: "bg-accent text-accent-foreground hover:bg-accent/80",
        outline: "border border-primary disabled:border-neutral disabled:bg-background text-primary bg-background hover:bg-background/80",
        "outline-accent": "border border-accent disabled:border-neutral disabled:bg-background text-accent bg-background hover:bg-background/80",
      },
      size: {
        default: "h-9 px-4 py-2",
        icon: "h-9 w-15",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

