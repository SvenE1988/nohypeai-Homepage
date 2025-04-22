
import React from 'react'
import { cn } from '@/lib/utils'
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
    "relative group border text-foreground mx-auto text-center rounded-xl",
    {
        variants: {
            variant: {
                default: "bg-blue-500/5 hover:bg-blue-500/0 border-blue-500/20",
                solid: "bg-primary hover:bg-primary/90 text-white border-transparent hover:border-foreground/50 transition-all duration-200",
                ghost: "border-transparent bg-transparent hover:border-zinc-600",
                secondary: "bg-secondary hover:bg-secondary/90 text-white border-transparent hover:border-foreground/50 transition-all duration-200",
            },
            size: {
                default: "px-7 py-1.5",
                sm: "px-4 py-0.5",
                lg: "px-10 py-2.5",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { neon?: boolean }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, neon = true, size, variant, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size }), className)}
                ref={ref}
                {...props}
            >
                <span className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-xl hidden", neon && "block")} />
                {children}
            </button>
        );
    }
)

Button.displayName = 'Button';

export { Button, buttonVariants };
