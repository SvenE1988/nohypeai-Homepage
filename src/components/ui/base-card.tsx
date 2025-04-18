
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "./card";

const baseCardVariants = cva(
  "relative bg-gradient-to-br from-[#1A1F35]/95 to-[#252A40]/95 border border-white/10 rounded-xl transition-all duration-300 hover:border-primary/30 backdrop-blur-sm shadow-lg hover:shadow-xl",
  {
    variants: {
      size: {
        default: "p-6",
        lg: "p-8",
        sm: "p-4",
      },
    },
    defaultVariants: {
      size: "default",
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
  ...props
}: BaseCardProps) => {
  return (
    <Card
      className={cn(
        baseCardVariants({ size }),
        noBorder && "border-0",
        "group",
        className
      )}
      {...props}
    />
  );
};

export { BaseCard, baseCardVariants };
