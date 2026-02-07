import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--accent-gold)] text-[var(--background-primary)]",
        secondary:
          "bg-[var(--background-tertiary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]",
        outline:
          "border border-[var(--border-default)] text-[var(--text-secondary)]",
        success:
          "bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20",
        warning:
          "bg-[var(--warning)]/10 text-[var(--warning)] border border-[var(--warning)]/20",
        new:
          "bg-[var(--accent-blue)] text-white font-semibold",
        comingSoon:
          "bg-[var(--background-tertiary)] text-[var(--text-muted)] border border-[var(--border-subtle)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
