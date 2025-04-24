
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Card } from "./card";

/**
 * BaseCard - A reusable card component enforcing the unified card design across the app.
 *
 * Features:
 * - Gradient background + glassmorphism effect
 * - Border with hover color effect
 * - Glow effect for `active`/`hover` states
 * - Handy `size` and `noBorder` props for layout flexibility
 *
 * Usage example:
 * 
 * <BaseCard size="lg" active className="my-4">
 *   <div>Custom content</div>
 * </BaseCard>
 */

const baseCardVariants = cva(
  [
    // Card base (gradient, border, glass, shadow)
    "relative group rounded-xl overflow-hidden bg-gradient-to-br from-black/60 to-black/40 border border-gray-800 shadow-lg transition-all duration-300",
    // Interactivity (hover, scaling, border color)
    "hover:border-primary/50 hover:scale-[1.02]",
  ].join(" "),
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
  /** Removes border for special contexts (optional) */
  noBorder?: boolean;
  /** "Active" state applies glow (optional) */
  active?: boolean;
}

/**
 * The standardized Card container.
 */
const BaseCard = ({
  className,
  size,
  noBorder,
  active,
  ...props
}: BaseCardProps) => (
  <Card
    className={cn(
      baseCardVariants({ size, active }),
      noBorder && "border-0",
      className
    )}
    {...props}
  />
);

export { BaseCard, baseCardVariants };
