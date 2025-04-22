
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Card } from "./card";

/**
 * Unified card variant for gradient, border, shadow, transitions, and glow.
 * Supports size variants and 'active' prop for special glow case.
 */
const baseCardVariants = cva(
  "relative group transition-all duration-300 rounded-xl overflow-hidden bg-gradient-to-br from-black/60 to-black/40 border border-gray-800 hover:border-primary/50 hover:scale-[1.02] shadow-lg",
  {
    variants: {
      size: {
        default: "p-6",
        lg: "p-8",
        sm: "p-4",
      },
      active: {
        true: "border-primary/60 shadow-[0_0_15px_rgba(255,0,153,0.15)]",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      active: false,
    },
  }
);

export interface BaseCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof baseCardVariants> {
  noBorder?: boolean;
}

const BaseCard = ({
  className,
  size,
  noBorder,
  active,
  ...props
}: BaseCardProps) => {
  return (
    <Card
      className={cn(
        baseCardVariants({ size, active }),
        noBorder && "border-0",
        className
      )}
      {...props}
    />
  );
};

export { BaseCard, baseCardVariants };
